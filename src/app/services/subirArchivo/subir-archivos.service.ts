import { Injectable } from '@angular/core';
import {URL_API} from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivosService {

  constructor() { }

  subirArchivo(archivo: File, coleccion: string, id: string) {
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();
      formData.append('imagen', archivo, archivo.name);
      // tslint:disable-next-line:only-arrow-functions
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 ) {
          if (xhr.status === 200) {
            console.log('Imagen subida');
            // Lo parseamos para pasarlo de string a objeto javascript manipulable como tal.
            resolve( JSON.parse(xhr.response));
          } else {
            console.log('Falló la subida');
            reject(xhr.response);
          }
        }
      };
      const url = URL_API + '/upload/' + coleccion + '/' + id;
      xhr.open('PUT', url, true);
      xhr.send(formData);
    });
  }
}
