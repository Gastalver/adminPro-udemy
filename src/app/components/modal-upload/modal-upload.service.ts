import {EventEmitter, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {
  public coleccion: string;
  public id: string;
  public oculto = 'oculto';
  // Emitiremos un evento con la respuesta de la ruta subir imagen.
  public notificacion = new EventEmitter<any>();

  ocultarModal() {
    this.oculto = 'oculto';
    this.coleccion = null;
    this.id = null;
  }

  mostrarModal(coleccion: string, id: string) {
    this.oculto = '';
    this.coleccion = coleccion;
    this.id = id;
  }
  constructor() {
  }
}
