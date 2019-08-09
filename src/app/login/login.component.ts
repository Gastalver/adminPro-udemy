import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

// TRUCO para ejecutar un script ubicado en Index.html. En este caso custom.js, el cual hemos envuelto en la función
// que ahora declaramos y usamos en el onInit
declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
    init_plugins();
  }
ingresar() {
    console.log('Ingresando...');
    this.router.navigate(['/dashboard']);
}
}
