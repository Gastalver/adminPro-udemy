// Dependencias
import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import Swal from 'sweetalert2';

// Servicios
import {HospitalService, ModalUploadService} from '../../services/service.index';

// Modelos
import {Hospital} from '../../models/hospital.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  public hospitales: Hospital[];
  public totalHospitales: number;
  public cargando = false;
  public desde = 0;

  constructor(
    private servicioHospitales: HospitalService,
    private servicioModalUpload: ModalUploadService
  ) { }

  ngOnInit() {
    this.servicioHospitales.cargarHospitales().subscribe(
      (respuesta: any) => {
        console.log(respuesta);
        this.hospitales = respuesta.hospitales;
        this.totalHospitales = respuesta.total;
      },
      (error) => {
        console.log(error);
      }
    );
    this.servicioModalUpload.notificacion.subscribe(
      () => {
        this.cargarHospitales();
      }
    );
  }
  cargarHospitales() {
    this.cargando = true;
    this.servicioHospitales.cargarHospitales(this.desde).subscribe(
      (respuesta: any) => {
        this.hospitales = respuesta.hospitales;
        this.totalHospitales = respuesta.total;
        this.cargando = false;
      }
    );
  }
  buscarHospital(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }
    this.cargando = true;
    this.servicioHospitales.buscarHospital(termino).subscribe(
      (hospitales: Hospital[]) => {
        console.log(hospitales);
        this.hospitales = hospitales;
        this.cargando = false;
      }
    );
  }
  mostrarModal(id: string) {
    this.servicioModalUpload.mostrarModal('hospitales', id);
  }

  actualizarHospital(hospital: Hospital) {
    this.servicioHospitales.actualizarHospital(hospital).subscribe(
      (respuesta) => {
        console.log(respuesta);
      }
    );
  }
  borrarHospital(hospital: Hospital) {
// Pedimos confirmación por medio de mensaje de alerta.
    Swal.fire({
      title: '¿Está seguro?',
      text: '¡No podrá recuperar el hospital ' + hospital.nombre + '!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, elimínar.',
      cancelButtonText: 'No, conservarlo.'
    }).then((borrar) => {
      if (borrar.value) {
        // Servicio de borrado
        this.servicioHospitales.borrarHospital(hospital._id).subscribe(
          (respuesta: any) => {
            this.cargarHospitales();
          }
        );
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (borrar.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Eliminación cancelada',
          'El hospital ' + hospital.nombre + ' está a salvo :)',
          'error'
        );
      }
    });
  }
  cambiarDesde(valor: number) {
    // Validamos que es posible. Para ello creamos una variable local
    const desde = this.desde + valor;
    if (desde >= this.totalHospitales) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarHospitales();
  }
  async crearHospital() {

      const {value: nombre} = await Swal.fire({
      title: 'Indique el nombre del nuevo Hospital',
      input: 'text',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return '¡Debe indicar un nombre!';
        }
      }
    })
      if (nombre) {
      this.servicioHospitales.crearHospital(nombre).subscribe(
        () => {
          this.cargarHospitales();
        }
        );
    }
  }
}
