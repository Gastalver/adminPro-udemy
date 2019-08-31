import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import {SubirArchivosService, ModalUploadService} from '../../services/service.index';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {
  public imagenSubir: File;
  public imagenTemporal: string | ArrayBuffer;

  constructor(
    public servicioSubirArchivo: SubirArchivosService,
    public servicioModalUpload: ModalUploadService
  ) {
  }

  ngOnInit() {
  }
  seleccionImagen( archivo: File) {
    // console.log(evento);
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
    // Comprobación de seguridad de que es efectivamente un archivo de imagen. Se puede hacer más robusto.
    if (archivo.type.indexOf('image') < 0) {
      this.imagenSubir = null;
      Swal.fire('El archivo seleccionado no es una imagen', archivo.name, 'error');
    }
    // Ya sabemos que el archivo elegido es una imagen, la pasamos a la propiedad imagenSubir.
    this.imagenSubir = archivo;
    // Para que se muestre inmediatamente, sin darle al botón submit de cambiar imagen,
    // nos valemos de funciones de vanilla Javascript.
    const reader = new FileReader();
    const urlImagenTemporal = reader.readAsDataURL(archivo);
    reader.onloadend = () => {
      // console.log(reader.result);
      this.imagenTemporal = reader.result;
    }

    console.log(archivo);
  }
  subirImagen() {
    this.servicioSubirArchivo.subirArchivo(this.imagenSubir, this.servicioModalUpload.coleccion, this.servicioModalUpload.id).then(
      (respuesta) => {
        console.log(respuesta)
        this.servicioModalUpload.notificacion.emit(respuesta);
        this.cerrarModal();
      },
    ).catch(
      (error) => {
        console.log('Error en la carga: ' +  error);
      }
    );
  }
  cerrarModal() {
    this.imagenTemporal = null;
    this.imagenSubir = null;
    this.servicioModalUpload.ocultarModal();
  }
}
