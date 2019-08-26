import { Component, OnInit } from '@angular/core';
import {Form, FormControl, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import {UsuarioService} from '../services/service.index';
import {Usuario} from '../models/usuario.model';
import { Router} from '@angular/router';

// TRUCO para ejecutar un script ubicado en Index.html. En este caso custom.js, el cual hemos envuelto en la función
// que ahora declaramos y usamos en el onInit
declare function init_plugins();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})

export class RegisterComponent implements OnInit {
  public formulario: FormGroup ;
  constructor(
    public servicioUsuario: UsuarioService,
    public router: Router
  ) { }

  ngOnInit() {
    init_plugins();

    this.formulario = new FormGroup(
      {
        nombre: new FormControl(null, Validators.required),
        correo: new FormControl(null, [Validators.required, Validators.email ]),
        password: new FormControl(null, Validators.required),
        password2: new FormControl(null, Validators.required),
        condiciones: new FormControl(),
      },
      {
        validators: this.sonIguales('password', 'password2')
      }
    );
    this.formulario.setValue({
      nombre: 'Usuario ficticio',
      correo: 'usuario@ficticio.com',
      password: '123456',
      password2: '12345',
      condiciones: true
    });

  }

  /**
   * TRUCO Función para implementar una validación propia, no de sistema.
   */
  sonIguales(campo1: string, campo2: string) {
    // Obligatorio retornar en primer lugar una función que use como parámetro un FormGroup
    return (group: FormGroup) => {
      // Aquí la lógica de nuestra validación particular.
      const valorCampo1 = group.controls[campo1].value;
      const valorCampo2 = group.controls[campo2].value;
      // Si pasa la validación es obligatorio hacer un return null.
      if (valorCampo1 === valorCampo2) {
        return null;
      }
      // Si no la pasa es obligatorio un return con un mensaje de error
      return {
        sonIguales: true
      };
    };
  }
  registrarUsuario() {
    if (this.formulario.invalid) {
      Swal.fire('Que no, que no...');
      return;
    }
    if (!this.formulario.value.condiciones) {
      console.log('No se han aceptado las condiciones');
      Swal.fire('Ejem, perdone...', 'Debe aceptar las Condiciones Generales', 'warning');
    }
    console.log(this.formulario.value);
    console.log('¿Formulario Válido?: ', this.formulario.valid);

    const nuevoUsuario: Usuario = new Usuario(
      this.formulario.value.nombre,
      this.formulario.value.correo,
      this.formulario.value.password,
    );
    this.servicioUsuario.crearUsuario(nuevoUsuario).subscribe(
      (usuarioCreado) => { this.router.navigate(['/login']); });
}

}
