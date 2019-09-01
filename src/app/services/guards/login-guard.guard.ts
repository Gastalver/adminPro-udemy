import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {UsuarioService} from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {

  constructor(
    public servicioUsuario: UsuarioService,
    public router: Router
  ) {}

  canActivate(): boolean {
    if (this.servicioUsuario.estaLogueado()) {
      // console.log('Pasó el LoginGuard');
      return true;
    } else {
      // console.log('Bloquedado por el LoginGuard');
      this.router.navigate(['/login'])
      return false;
    }
  }
}
