import { Component, OnInit } from '@angular/core';
import {ActivationEnd, Router} from '@angular/router';
import {filter, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Meta, MetaDefinition, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {
  public titulo;
  constructor(
    private router: Router,
    private title: Title,
    private meta: Meta
  ) {
      this.getDataRoute()
        .subscribe(
      data  => {
        // console.log(data);
        this.titulo = data.titulo;
        this.title.setTitle(this.titulo);
        const metaTag: MetaDefinition = {
          name: 'description',
          content: data.descripcion
        };
        this.meta.updateTag(metaTag);
      }
    );
  }

  ngOnInit() {
  }

  getDataRoute(): Observable<any> {
    return this.router.events
      .pipe(
        filter((evento) => evento instanceof ActivationEnd),
        filter((evento: ActivationEnd) => evento.snapshot.firstChild == null),
        map((evento: ActivationEnd) =>  evento.snapshot.data)
      );
  }
}
