import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
// Servicios
import {UsuarioService, ModalUploadService} from '../../services/service.index';

// Modelos
import {Usuario} from '../../models/usuario.model';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  public usuarios: Usuario[];
  public desde = 0;
  public totalRegistros = 0;
  public cargando = true;

  constructor(
    public servicioUsuario: UsuarioService,
    public servicioModalUpload: ModalUploadService
  ) {
  }

  ngOnInit() {
    this.cargarUsuarios();
    this.servicioModalUpload.notificacion.subscribe(
      (respuesta) => {
        this.cargarUsuarios();
      }
    );
  }

  cargarUsuarios() {
    this.cargando = true;
    this.servicioUsuario.cargarUsuarios(this.desde).subscribe(
      (respuesta: any) => {
        // console.log(respuesta);
        this.totalRegistros = respuesta.total;
        this.usuarios = respuesta.usuarios;
        this.cargando = false;
      }
    );
  }

  cambiarDesde(valor: number) {
    // Validamos que es posible. Para ello creamos una variable local
    const desde = this.desde + valor;
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario(termino: string) {
    console.log(termino);
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this.servicioUsuario.buscarUsuarios(termino).subscribe(
      (usuarios: Usuario[]) => {
        console.log(usuarios);
        this.usuarios = usuarios;
        this.cargando = false;
      }
    );
  }

  borrarUsuario(usuario: Usuario) {
    // Impedimos que se borre a sí mismo.
    if (usuario._id === this.servicioUsuario.usuario._id) {
      Swal.fire('No puede borrar usuario', 'No se puede borrar a sí mismo', 'error');
      return;
    }
    // Pedimos confirmación por medio de mensaje de alerta.
    Swal.fire({
      title: '¿Está seguro?',
      text: '¡No podrá recuperar al usuario ' + usuario.nombre + '!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, elimínar.',
      cancelButtonText: 'No, conservarlo.'
    }).then((borrar) => {
      if (borrar.value) {
        // Servicio de borrado
        this.servicioUsuario.borrarUsuario(usuario).subscribe(
          (respuesta: any) => {
            this.cargarUsuarios();
          }
        );
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (borrar.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Eliminación cancelada',
          'El usuario ' + usuario.nombre + ' está a salvo :)',
          'error'
        );
      }
    });
  }
  guardarUsuario(usuario: Usuario) {
    this.servicioUsuario.actualizarUsuario(usuario).subscribe();
  }

  mostrarModal(id: string) {
    this.servicioModalUpload.mostrarModal('usuarios', id);
  }


}
