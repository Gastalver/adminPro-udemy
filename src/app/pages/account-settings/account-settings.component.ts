import {Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';
import { ElementRef} from '@angular/core';

// Servicios
import {SettingsService} from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(public ajustesService: SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(tema: string, link: ElementRef) {
    this.aplicarCheck(link);
    this.ajustesService.aplicarTema(tema);
  }

 aplicarCheck(link: any) {
    // Recopilamos todos los elementos HTML con la clase "selector", es decir, todos los links <a> a los temas.
   const selectores: any = document.getElementsByClassName('selector');
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

 colocarCheck(){
   // Para colocar el check en el tema seleccionado. Partimos de que no hay ninguno seleccionado.
   // Recopilamos todos los elementos HTML con la clase "selector", es decir, todos los links <a> a los temas.
   const selectores: any = document.getElementsByClassName('selector');
   // Mediante un bucle comprobamos si su atributo data-theme coincide con el tema de ajustes y
   // en caso afirmativo le aañadimos el estilo working que es el que muestra el tick.
   const temaActual = this.ajustesService.ajustes.tema;
   for (const elementoIndividual of selectores) {
     if (elementoIndividual.getAttribute('data-theme') === temaActual) {
       elementoIndividual.classList.add('working');
     }
   }
 }
}
