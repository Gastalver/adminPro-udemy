import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { URL_API} from '../../config/config';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

// Modelos
import {Medico} from '../../models/medico.model';

// Servicios
import { UsuarioService} from '../usuario/usuario.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {
  public totalMedicos: number;
  constructor(
    public servicioHTTP: HttpClient,
    public servicioUsuario: UsuarioService,
    public router: Router
  ) {
    console.log('Servicio médico activo');
  }

  cargarMedicos(desde: number) {
    const url = URL_API + '/medico' + '?desde=' + desde;
    return this.servicioHTTP.get(url).pipe(
      map(
        (respuesta: any) => {
          // console.log(respuesta);
          this.totalMedicos = respuesta.total;
          return respuesta.medicos;
        }
      )
    );
  }
  cargarMedico(id: string) {
    const url = URL_API + '/medico/' + id;
    return this.servicioHTTP.get(url).pipe(
      map(
        (respuesta: any) => {
          // console.log(respuesta);
          return respuesta.medico;
        }
      )
    );
  }
  buscarMedicos(termino: string) {
    const url = URL_API + '/busqueda/medicos/' + termino;
    return this.servicioHTTP.get(url).pipe(
      map((respuesta: any) => {
        return respuesta.medicos;
      })
    );
  }
  eliminarMedico(medico: Medico) {
    const url = URL_API + '/medico/' + medico._id;
    const cabeceras = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.servicioUsuario.token);
    return this.servicioHTTP.delete(url, {headers: cabeceras}).pipe(
      map(
        (respuesta: any) => {
          Swal.fire(
            'Eliminado',
            'El médico ' + respuesta.medico.nombre + ' ha sido eliminado.',
            'success'
          );
          return respuesta;
        })
    );
  }
  guardarMedico(medico: Medico) {
    let url = URL_API + '/medico';
    // Si existe la propiedad medico._id, estamos actualizanndo. Si no, estamos creando.
    if (medico._id) {
      // Actualizando
      url += '/' + medico._id;
      const cabeceras = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', this.servicioUsuario.token);
      return this.servicioHTTP.put(url, medico, { headers: cabeceras}).pipe(
        map(
          (respuesta: any) => {
            Swal.fire(
              'Actualizado',
              'El médico ' + respuesta.medico.nombre + ' ha sido actualizado.',
              'success'
            );
            return respuesta.medico;
          }
        )
      )
    } else {
      // Creando
      const cabeceras = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', this.servicioUsuario.token);
      return this.servicioHTTP.post(url, medico, {headers: cabeceras}).pipe(
        map(
          (respuesta: any) => {
            Swal.fire(
              'Guardado',
              'El médico ' + respuesta.medico.nombre + ' ha sido guardado correctamente.',
              'success'
            );
            return respuesta.medico;
          }
        )
      );
    }
  }
}
