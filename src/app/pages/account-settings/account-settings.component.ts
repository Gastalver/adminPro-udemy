import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import { ElementRef} from '@angular/core';
import {parseSelectorToR3Selector} from '@angular/compiler/src/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(
    // TRUCO: Esta es la forma de injectar el objeto DOCUMENT para tener acceso al DOM;
    @Inject(DOCUMENT) private document
  ) { }

  ngOnInit() {
  }
 cambiarColor(tema: string, link: ElementRef) {
    // TRUCO: Asignar tipo ElementRef a variable que trae objeto DOM, para tener sus propiedades. Importar libreria.
    console.log(link);
    const url = `assets/css/colors/${tema}.css`;
    this.document.getElementById('theme').setAttribute('href', url);
    this.aplicarCheck(link);
 }
 aplicarCheck(link: ElementRef) {
    // Recopilamos todos los elementos HTML con la clase "selector", es decir, todos los links <a> a los temas.
   const selectores = document.getElementsByClassName('selector');
    // Mediante un bucle les eleminamos a todos la clase working.
   // TRUCO: Para eliminar una clase de un elemento HTML: x.classList.remove(clase)
   for (const elementoIndividual of selectores) {
     elementoIndividual.classList.remove('working');
    }
   // Añadimos la clase working al elemento <a> sobre el que se ha hecho clic
   // TRUCO: Para añadir una clase a un elemento HTML: x.classList.add(clase)
   // @ts-ignore
   link.classList.add('working');
 }

}
