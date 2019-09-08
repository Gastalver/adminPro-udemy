import { Injectable } from '@angular/core';
import {UsuarioService} from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
 // public menu: any = [
 //   {
 //     titulo: 'Principal',
 //     icono: 'mdi mdi-gauge',
 //     submenu: [
 //       { titulo: 'Dashboard', url: '/dashboard'},
 //       { titulo: 'ProgressBar', url: '/progress'},
 //       { titulo: 'Graficas', url: '/graficas1'},
 //       { titulo: 'Promesas', url: '/promesas'},
 //       { titulo: 'Rxjs', url: '/rxjs'},
 //     ]
 //   },
 //   {
 //     titulo: 'Mantenimiento',
 //     icono: 'mdi mdi-folder-lock-open',
 //     submenu: [
 //       { titulo: 'Usuarios', url: '/usuarios'},
 //       { titulo: 'Médicos', url: '/medicos'},
 //       { titulo: 'Hospitales', url: '/hospitales'}
 //     ]
 //   }
 // ];
  public menu: any = [];
  constructor(
    public servicioUsuario: UsuarioService
  ) {
  }
  // Creamos una función aparte para invocarla cada vez que se carque el sidebarcomponent,
  // porque si la invocamos desde aquí, sólo se cargará una vez, cuando se inicilice el servicio,
  // y no se actualizará al cambiar por ejemplo de usuario, ya que la app es la misma y si está
  // cargada ya ha inicilizado el servicio, que es root provider.
  cargarMenu() {
    this.menu = this.servicioUsuario.menu;
  }
}
