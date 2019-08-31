import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {URL_API} from '../../config/config';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import Swal from 'sweetalert2';

// Modelos
import {Usuario} from '../../models/usuario.model';
import {Router} from '@angular/router';
import {SubirArchivosService} from '../subirArchivo/subir-archivos.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  // Si estas dos propiedades tienen contenido, es que el usuario está logeado
  // No confundir con los parámetros de las funciones, que no tienen nada que ver.
  public token: string;
  public usuario: Usuario;

  /**
   * Comprueba si la propiedad token tiene valor o no, o sea, si el usuario está logueado o no.
   */
  estaLogueado(): boolean {
    return (this.token.length > 5) ? true : false;
  }

  /**
   * Inicializa los valores de token y de usuario. Lo cargamos en el constructor
   * para que lo haga siempre que se inicie el servicio.
   */
  cargarStorage(): void {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  /**
   * Lógica del proceso de login normal
   * @param usuario Un objeto de tipo Usuario
   * @param recuerdame Un booleano que informa si quiere ser recordado
   */
  public login(usuario: Usuario, recuerdame: boolean): Observable<any> {
    // Primero gestionamos la opción de recordar usuario
    if (recuerdame) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    // Luego gestionamos el request post /login
    const url = URL_API + '/login';
    return this.httpService.post(url, usuario).pipe(
      // Si el login es correcto serializamos (guardamos y tendremos disponibles) los datos en el localhost
      map(
        (respuesta: any) => {
          this.guardarStorage(respuesta.id, respuesta.token, respuesta.usuario);
          // Devolvemos solo true, porque no necesitamos hacer nada más con la respuesta
          // El componente que consume el servicio simplemente redirigirá a la página autenticada de inicio.
          // Cfr. susbscribe en login.component.ts
          return true;
        }
      )
    );
  }

  public logOut() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  public loginGoogle(token: string): Observable<any> {
    // Luego gestionamos el request post /login/google
    const url = URL_API + '/login/google';
    return this.httpService.post(url, {token} ).pipe(
      map((respuesta: any) => {
        this.guardarStorage(respuesta.id, respuesta.token, respuesta.usuario);
        return true;
      })
    );
  }

  constructor(
    public httpService: HttpClient,
    public router: Router,
    public servicioSubirImagen: SubirArchivosService
  ) {
    // Inicializamos valores token y usuario cada vez que se cargue el servicio.
    this.cargarStorage();
  }

  /**
   * Crea un usuario
   * @param usuario Un objeto de tipo Usuario
   */
  crearUsuario(usuario: Usuario ): Observable<any> {
    const url = URL_API + '/usuario';
    return this.httpService.post(url, usuario)
      .pipe(
        map((respuesta: any) => {
          Swal.fire('Registro finalizado', `Usuario ${respuesta.usuario.email} creado correctamente` );
          return respuesta.usuario;
        })
      );
  }

  actualizarUsuario(usuario: Usuario): Observable<any> {
    const url = URL_API + '/usuario/' + usuario._id;
    const cabeceras = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.token);
    // console.log('URL actualizar: ' + url);
    return this.httpService.put(url, usuario, { headers: cabeceras}).pipe(
      map((respuesta: any) => {
        // Si se ha modificado el usuario logueado, actualizamos el valor
        // del localStorage. Si no -por ejemplo si desde
        // mantenimiento se ha actualizado otro usuario- no.
        if (respuesta.usuario._id === this.usuario._id) {
          const usuarioActualizado: Usuario = respuesta.usuario;
          this.guardarStorage(usuarioActualizado._id, this.token, usuarioActualizado );
        }
        Swal.fire('Usuario actualizado', usuario.nombre, 'success');
      })
    );
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', JSON.stringify(id));
    localStorage.setItem('token', JSON. stringify(token));
    localStorage.setItem('usuario', JSON.stringify(usuario));
    // Seteamos las propiedades token y usuario, para que conste que está logueado.
    this.token = token;
    this.usuario = usuario;
  }
  cambiarImagen(archivo: File, id: string) {
    this.servicioSubirImagen.subirArchivo(archivo, 'usuarios', id).then(
      (respuesta: any) => {
        console.log(respuesta);
        this.usuario.img = respuesta.usuario.img;
        Swal.fire('Imagen actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario);
      }
    ).catch( respuestaRejected => {
      console.log(respuestaRejected);
    });
  }

  cargarUsuarios(desde: number = 0, ) {
    const url = URL_API + '/usuario?desde=' + desde;
    return this.httpService.get(url);
  }
  buscarUsuarios(termino: string) {
    const url = URL_API + '/busqueda/usuarios/' + termino;
    return this.httpService.get(url).pipe(
      map((respuesta: any) => {
        return respuesta.usuarios;
      })
    );
  }
  borrarUsuario(usuario: Usuario) {
    const url = URL_API + '/usuario/' + usuario._id;
    const cabeceras = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.token);
    return this.httpService.delete(url, {headers: cabeceras}).pipe(
      map(
        (respuesta: any) => {
          Swal.fire(
            'Eliminado',
            'El usuario ' + respuesta.usuario.nombre + ' ha sido eliminado.',
            'success'
          );
          return respuesta;
        })
    );
  }
}
