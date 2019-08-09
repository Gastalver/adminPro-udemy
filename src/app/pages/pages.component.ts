import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

// TRUCO para ejecutar un script ubicado en Index.html. En este caso custom.js, el cual hemos envuelto en la función
// que ahora declaramos y usamos en el onInit
declare function init_plugins();
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}
