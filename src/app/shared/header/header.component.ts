import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../../services/service.index';
import {Usuario} from '../../models/usuario.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {
  public usuario: Usuario;
  constructor(
    public servicioUsuario: UsuarioService
  ) { }

  ngOnInit() {
    this.usuario = this.servicioUsuario.usuario;
  }

}
