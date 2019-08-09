import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  // Propiedad ajustes de tipo Ajustes (interface) con valores por defecto
  public ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default-dark.css',
    tema: 'default-dark'
  }

  constructor(
    // TRUCO: Esta es la forma de injectar el objeto DOCUMENT para tener acceso al DOM;
    @Inject(DOCUMENT) private document,
  ) {
    this.cargarAjustes();
  }

  guardarAjustes() {
    localStorage.setItem('ajustes', JSON.stringify(this.ajustes));
    // console.log('Ajustes guardados en el localStorage');
  }

  cargarAjustes() {
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      // console.log('Cargando ajustes del localStorage');
      this.aplicarTema(this.ajustes.tema);
    } else {
      // console.log('Usando ajustes por defecto');
      this.aplicarTema(this.ajustes.tema);
    }
  }
 aplicarTema(tema: string) {
   const url = `assets/css/colors/${tema}.css` ;

    // TRUCO: Cambiar propiedades de elemento ubicado en el <head> fuera del html del componente.
   this.document.getElementById('theme').setAttribute('href', url);

   this.ajustes.temaUrl = url;
   this.ajustes.tema = tema;
   this.guardarAjustes();
 }


}

// Creamos interface para restringir lo que se puede usar como Ajustes. Así tendremos ayuda de TypeScript.
interface Ajustes {
  temaUrl: string;
  tema: string;
}
