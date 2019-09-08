// Dependencias
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

// Modelos
import {Usuario} from '../../models/usuario.model';

// Servicios
import {UsuarioService} from '../../services/service.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  public usuario: Usuario;
  constructor(
    public servicioUsuario: UsuarioService,
    public router: Router
  ) { }

  ngOnInit() {
    this.usuario = this.servicioUsuario.usuario;
  }
  buscar(termino: string) {
    if (termino.length <= 0 ) {
      return;
    }
    this.router.navigate(['/busqueda', termino]);
  }

}
