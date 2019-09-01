import { Component, OnInit } from '@angular/core';

// Servicios
import { MedicoService, ModalUploadService } from '../../services/service.index';

// Modelos
import {Medico} from '../../models/medico.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {
  public medicos: Medico[];
  public desde = 0;
  public cargando = false;
  constructor(
    private servicioMedicos: MedicoService,
    private servicioModalUpload: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
    this.servicioModalUpload.notificacion.subscribe(
      () => this.cargarMedicos()
    );
  }

  cargarMedicos() {
    this.cargando = true;
    this.servicioMedicos.cargarMedicos(this.desde).subscribe(
      (medicos) => {
        this.medicos = medicos
        this.cargando = false;
      });
  }
  crearMedico(medico: Medico) {}
  editarMedico(medico: Medico) {}
  eliminarMedico(medico: Medico) {
    // Pedimos confirmación por medio de mensaje de alerta.
    Swal.fire({
      title: '¿Está seguro?',
      text: '¡No podrá recuperar al médico ' + medico.nombre + '!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar.',
      cancelButtonText: 'No, conservarlo.'
    }).then((borrar) => {
      if (borrar.value) {
        // Servicio de borrado
        this.servicioMedicos.eliminarMedico(medico).subscribe(
          (respuesta: any) => {
            this.cargarMedicos();
          }
        );
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (borrar.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Eliminación cancelada',
          'El médico ' + medico
            .nombre + ' está a salvo :)',
          'error'
        );
      }
    });
  }
  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this.servicioMedicos.buscarMedicos(termino).subscribe(
      (medicos) => {
        this.medicos = medicos;
      }
    );
  }
  cambiarDesde(valor: number) {
    // Validamos que es posible. Para ello creamos una variable local
    const desde = this.desde + valor;
    console.log('desde local: ' + desde);
    if (desde >= this.servicioMedicos.totalMedicos) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    console.log('this.desde = ' + this.desde);
    this.cargarMedicos();
  }
  mostrarModal(id: string) {
    this.servicioModalUpload.mostrarModal('medicos', id);
  }
}
