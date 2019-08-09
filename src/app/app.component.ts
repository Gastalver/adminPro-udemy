import { Component } from '@angular/core';

// Servicios
import {SettingsService} from './services/service.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'adminpro';
   constructor(
     // El servicio incluye la función cargarAjustes() en su constructor por lo que la instanciación la ejecuta.
     public ajustesService: SettingsService
   ) {}

}
