import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {URL_API} from '../../config/config';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import Swal from 'sweetalert2';

// Modelos
import { Hospital} from '../../models/hospital.model';
import {UsuarioService} from '../usuario/usuario.service';
import {Usuario} from '../../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
    private servicioHTTP: HttpClient,
    private servicioUsuario: UsuarioService
  ) {
    console.log('HospitalService cargado');
  }
  cargarHospitales(desde: number = 0) {
    const url = URL_API + '/hospital' + '?desde=' + desde;
    return this.servicioHTTP.get(url);
  }
  obtenerHospital(id: string) {
    const url = URL_API + '/hospital/' + id;
    return this.servicioHTTP.get(url).pipe(
      map((respuesta: any) => {
        return respuesta.hospital;
      })
    );
  }
  borrarHospital(id: string) {
    const url = URL_API + '/hospital/' + id;
    const cabeceras = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.servicioUsuario.token);
    return this.servicioHTTP.delete(url, { headers: cabeceras}).pipe(
      map((respuesta: any) => {
        Swal.fire('Hospital eliminado', respuesta.hospital.nombre, 'success');
        return respuesta;
      })
    );
  }
  crearHospital(nombre: string) {
    const url = URL_API + '/hospital';
    const hospital = new Hospital(nombre);
    const cabeceras = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.servicioUsuario.token);
    return this.servicioHTTP.post(url, hospital, { headers: cabeceras}).pipe(
      map((respuesta: any) => {
        Swal.fire('Hospital creado', respuesta.hospital.nombre + ' correctamente creado.', 'success');
        return respuesta;
      })
    );
  }
  buscarHospital(termino: string) {
    const url = URL_API + '/busqueda/hospitales/' + termino;
    return this.servicioHTTP.get(url).pipe(
      map((respuesta: any) => {
        return respuesta.hospitales;
      })
    );
  }
  actualizarHospital(hospital: Hospital) {
    const url = URL_API + '/hospital/' + hospital._id;
    const cabeceras = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Authorization', this.servicioUsuario.token);
    return this.servicioHTTP.put(url, hospital, { headers: cabeceras}).pipe(
      map((respuesta: any) => {
        Swal.fire('Hospital actualizado', respuesta.hospital.nombre, 'success');
        return respuesta.hospital;
      })
    );
  }
}
