import { Component, OnInit } from '@angular/core';
import {Usuario} from '../../models/usuario.model';
import {UsuarioService} from '../../services/usuario/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  public usuario: Usuario;
  public imagenSubir: File;
  public imagenTemporal: string | ArrayBuffer;

  constructor(
    public servicioUsuario: UsuarioService
  ) {
    this.usuario = servicioUsuario.usuario;
  }

  ngOnInit() {
  }

  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    // Sólo permitimos cambiar el email si no es un usuario creado con Google SignIn.
    if (!this.usuario.google) {
    this.usuario.email = usuario.email;
    }
    this.servicioUsuario.actualizarUsuario(this.usuario).subscribe(
      () => {}
    );
 }

 seleccionImagen( archivo: File) {
    // console.log(evento);
   if (!archivo) {
     this.imagenSubir = null;
     return;
   }
   // Comprobación de seguridad de que es efectivamente un archivo de imagen. Se puede hacer más robusto.
   if (archivo.type.indexOf('image') < 0) {
     this.imagenSubir = null;
     Swal.fire('El archivo seleccionado no es una imagen', archivo.name, 'error');
   }
   // Ya sabemos que el archivo elegido es una imagen, la pasamos a la propiedad imagenSubir.
   this.imagenSubir = archivo;
   // Para que se muestre inmediatamente, sin darle al botón submit de cambiar imagen,
   // nos valemos de funciones de vanilla Javascript.
   const reader = new FileReader();
   const urlImagenTemporal = reader.readAsDataURL(archivo);
   reader.onloadend = () => {
     // console.log(reader.result);
     this.imagenTemporal = reader.result;
   }

   console.log(archivo);
 }

 cambiarImagen() {
    console.log('Se ejecutó cambiarImagen');
    this.servicioUsuario.cambiarImagen(this.imagenSubir, this.usuario._id);
 }
}
