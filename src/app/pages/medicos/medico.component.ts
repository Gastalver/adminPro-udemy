// Dependencias
import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

// Modelos
import {Hospital} from '../../models/hospital.model';
import {Medico} from '../../models/medico.model';

// Servicios
import {HospitalService, MedicoService, ModalUploadService} from '../../services/service.index';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {
  public hospitales: Hospital[] = [];
  public medico: Medico = new Medico('', '', '', '');
  public hospital: Hospital = new Hospital('', 'xxxx');
  constructor(
    private servicioHospitales: HospitalService,
    private servicioMedicos: MedicoService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public servicioModalUpload: ModalUploadService
  ) {
    this.activatedRoute.params.subscribe(
      (params) => {
        const id = params.id;
        console.log('id = ' + id);
        if (id !== 'nuevo') {
          this.cargarMedico(id);
        }
      }
    );
  }

  ngOnInit() {
    this.servicioHospitales.cargarHospitales()
      .subscribe(
      (respuesta: any) => {
        this.hospitales = respuesta.hospitales;
      }
      );
    this.servicioModalUpload.notificacion.subscribe(
        (respuesta) => {
          // console.log(respuesta);
          this.medico.img = respuesta.medico.img;
        }
      );
  }

  guardarMedico(formulario: NgForm) {
    // console.log(formulario.valid);
    // console.log(formulario.value);
    // @ts-ignore
    if (formulario.invalid) {
      return;
    }
    this.servicioMedicos.guardarMedico(this.medico).subscribe(
      (medico: Medico) => {
        // Completamos el medico con el id proporcionado por Mongo
        this.medico._id = medico._id;
        // Navegamos a la página de edición.
        this.router.navigate(['/medico', medico._id]);
      }
    );
  }
  cambioHospital(id: string) {
    this.servicioHospitales.obtenerHospital(id).subscribe(
      (hospital: Hospital) => {
        this.hospital = hospital;
      }
    );
  }
  cargarMedico(id: string) {
    this.servicioMedicos.cargarMedico(id).subscribe(
      (medico) => {
        this.medico = medico;
        this.medico.hospital = medico.hospital._id;
        this.cambioHospital(this.medico.hospital);
      }
    );
  }
  cambiarFotografia() {
    this.servicioModalUpload.mostrarModal('medicos', this.medico._id);
  }
}
