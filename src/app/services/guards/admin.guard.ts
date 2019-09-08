import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
// Servicios
import {UsuarioService} from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    public servicioUsuario: UsuarioService,
    public router: Router
  ) {
  }

  canActivate() {
  if (this.servicioUsuario.usuario.role === 'ADMIN_ROLE') {
    return true;
  } else {
    console.log('Bloquedado por el admin guard');
    this.servicioUsuario.logOut();
    return false;
  }
  }

}
