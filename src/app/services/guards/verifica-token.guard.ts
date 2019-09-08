import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {UsuarioService} from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements  CanActivate {

  constructor(
    public servicioUsuario: UsuarioService,
    public router: Router
  ) {}
  canActivate(): Promise<boolean> | boolean {
    // console.log('VerificaToken Guard');
    const token = this.servicioUsuario.token;
    // Recuperamos el payload convirtiendo el string en un objeto,
    // usando el comando atob sobre la primera parte del token, que es pública.
    // La segunda parte del token es la firma, que sí está encriptada.
    const payload = JSON.parse(atob( token.split('.')[1]));
    // console.log(payload);
    const expirado = this.expirado(payload.exp)
    // console.log('¿Token expirado? ', expirado);
    // Lógica del Guard
    if (expirado) {
      this.router.navigate(['/login']);
      return false;
    }
    return this.verificaRenueva(payload.exp);

  }
  /**
   * Responde si el token ha expirado (true) o no (false)
   */
  expirado(fechaExpiracion: number) {
    // Primer término de comparación, la fecha actual,
    // en segundos, para comparar con fecha de expiración token, que viene en segs.
    let ahora: number;
    ahora = new Date().getTime() / 1000;
    // Y comparamos.
    if (fechaExpiracion < ahora ) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Añade más tiempo al plazo de expiración del token si es que quedan
   * menos de cuatro horas para que expire.
   */
  verificaRenueva(fechaExpiracion: number): Promise<boolean> {
    // console.log('Entramos en VerificaRenueva')
    return new Promise(
      (resolve, reject) => {
        // Términos de comparación. Esta vez los ponemos todos en milisegs.
        // Primer término: Fecha de expiración
        const tokenExp = new Date(fechaExpiracion * 1000);
        // console.log ('tokenExp (en msegs): ', tokenExp );
        // Segundo término: Fecha actual más cuatro horas.
        const ahora = new Date();
        ahora.setTime(ahora.getTime() + (1 * 60 * 60 * 1000));
        // console.log ('ahora (en msegs): ', ahora );
        // Comparamos ambos
        // Si quedan más de una hora, retorna true, para el Guard, sin más.
        if (tokenExp.getTime() > ahora.getTime()) {
          // console.log('tokenExp es mayor que ahora, o sea, no hace falta renovar. Volvemos.');
          resolve(true);
        } else {
          // console.log('tokenExp es menor que ahora, o sea, hay que renovar.');
          // Si quedan menos de cuatro horas, renovamos token, y una
          // vez comprobado que el token ha sido renovado, resolvemos también
          // true, o si surge algún error, reject false, para el Guard.
          // Además si falla se redirige al login.
          this.servicioUsuario.renuevaToken().subscribe(
            (ok) => {
              // console.log('Token renovado');
              resolve(true);
            },
            (err) => {
              // console.log('Error al renovar token', err);
              this.router.navigate(['/login']);
              reject(false);
            }
          );
        }
      }
    );
  }

}
