import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

// Servicios
import {UsuarioService} from '../services/service.index';

// Modelos
import {Usuario} from '../models/usuario.model';

// TRUCO para ejecutar  un script ubicado en Index.html, en este caso custom.js:
//  Envolver el código fuente en una función (cfr. custom.js) que en este caso hemos llamado init_plugins
// usar declare para importar la función en el componente, y ejecutarla a conveniencia, en ese caso en el onInit
declare function init_plugins();
// Otro ejemplo de la misma técnica:
// Incluimos el objeto gapi (Google API) en el componente para poder utilizar sus metodos y propiedades directamente
// Se cargó globalmente desde el script platform.js incluido en index.html.
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public checkRecuerdame = false;
  public correo: string;
  public auth2: any;
  public googleUser;
  constructor(
    public router: Router,
    public servicioUsuario: UsuarioService
  ) { }

  ngOnInit() {
    // TRUCO Ejecutamos la función ubicada en el <head> que previamente declaramos.
    init_plugins();
    // Gestionamos la opción recuérdame
    // 1º Comprobamos si existe la voz email en localStorage y la asignamos a propiedad correo, o si no, cadena vacía
    // Y lo enviamos al formulario, al campo email, mediante un ngModel de un solo sentido, porque solo enviamos.
    // (Enviamos al formulario ahora, pero nunca necesitamos recibir.) - Cfr. login.com....html
    const correo = localStorage.getItem('email') || '';
    // 2ª Si correo existía -comprobado con longitud cadena- asignamos valor true a la propiedad checkRecuerdame
    // vinculada al estado del formulario mediante doble vinculación [(ngModel)] porque recibimos y enviamos valor
    // (Recibimos del formulario, al seleccionar usuario si quiere o no ser recordado.)
    // (Enviamos al formulario, ahora en este caso).
    if (correo.length > 0) {
      this.checkRecuerdame = true;
    }
    this.googleInit();
  }

  /**
   * Funciones basadas en https://developers.google.com/identity/sign-in/web/listeners
   * para controlar el proceso de Google SignIn
   */
  googleInit() {
  // Función general inicializadora
    gapi.load('auth2', () => {
      // Initializes Signin v2 and sets up listeners.
      this.auth2 = gapi.auth2.init({
        client_id: '1903587770-7qa1c89rbsv3b1f65a3hrs563d50ralq.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile'
      });
      this.attachSignIn(document.getElementById('btnGoogle'));
    });
  }
  attachSignIn( element) {
    this.auth2.attachClickHandler( element, {}, (googleUser) => {
      const profile = googleUser.getBasicProfile();
      const token = googleUser.getAuthResponse().id_token;
      this.servicioUsuario.loginGoogle(token).subscribe(() => {
        // this.router.navigate(['/dashboard']);
        // Forzamos la redirección con javascript para resolver un error que se
        // produciría usando lo anterior: Por alguna extraña razón no se recargan
        // los plugins de la plantilla. Así forzamos una recarga.
        window.location.href = '#/dashboard';
      });
    });
  }


  ingresar(formulario: NgForm) {
    if (formulario.invalid) {
      return;
    }
    const usuario: Usuario = new Usuario(
      null,
      formulario.value.email,
      formulario.value.password
    );
    this.servicioUsuario.login(usuario, this.checkRecuerdame).subscribe(
      () => this.router.navigate(['/dashboard'])
    );
    // console.log('¿Es válido el formulario? ', formulario.valid);
    // console.log('¿Qué contiene el formulario? ', formulario.value);
    // console.log('Valor propiedad recuérdame: ', formulario.value.recuerdame);

    // this.router.navigate(['/dashboard']);
  }
}
