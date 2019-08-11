import { Component, OnInit, OnDestroy } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {filter, map, retry} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
  public suscripcion: Subscription;
  constructor() {
    this.suscripcion = this.regresaObservable()
      .pipe(
        retry(2)
      )
      .subscribe(
      valor => console.log(valor),
      error => console.log('Error en el Obs ', error),
      () => console.log('El observable terminó')
    );
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    console.log('La página -componente- se va a cerrar');
    this.suscripcion.unsubscribe();
  }

  regresaObservable(): Observable<any> {
    return new Observable (
      observer => {
        let contador = 0;
        const intervalo = setInterval(
          () => {
            const salida = {
              valor: contador
            };
            observer.next(salida);
            contador += 1;
            // if (contador === 7) {
            //   clearInterval(intervalo);
            //   observer.complete();
            // }
          },
          1000
        );
      }
    )
      .pipe(
        map(
          (resp: any) => {
            return resp.valor;
          }
        ),
        filter(
          (valor: any, index) => {
            if (valor % 2) {
            //  Es Impar: No pasa el filtro.
              return true;
            } else {
            //  Es par: Pasa el filtro
            return false;
            }
          }
        )
      );
  }
}
