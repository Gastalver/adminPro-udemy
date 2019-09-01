import { Pipe, PipeTransform } from '@angular/core';
import { URL_API } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {
    // Hay que componer la dirección de la imagen para cargarla. Empezamos por la raiz de la url, que será común.
    let url = URL_API + '/imagen';

    // Si el pipe no recibe una imagen, devolvemos una dirección arbitraria, y el servidor
    // cargará la imagen por defecto.
    if (!img) {
      return url + '/usuarios/xxx';
    }

    // Si la dirección de la imagen contiene https es que es de Google, en ese caso no hace falta nada más,
    // porque google manda la dirección completa de la imagen. La devolvemos tal cual.
    if (img.indexOf('https') >= 0 ) {
      return img;
    }

    // Ahora hay que componer la url en función del tipo de imagen. (el servidor requiere saber la coleccion).
    switch (tipo) {
      case 'usuario':
        url += '/usuarios/' + img;
        break;
      case 'medico':
        url += '/medicos/' + img;
        break;
      case 'hospital':
        url += '/hospitales/' + img;
        break;
      default:
        console.log('Tipo de imagen no existe: usuarios, medicos, hospitales');
        url += '/usuarios/xxx';
    }

    // Y devolvemos la url que pedirá al servidor (o a Google) la imagen correspondiente.
    return url;
  }

}
