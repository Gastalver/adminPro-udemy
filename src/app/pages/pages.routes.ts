// Dependencias
import {RouterModule, Routes} from '@angular/router';
// Componentes
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProgressComponent} from './progress/progress.component';
import {Graficas1Component} from './graficas1/graficas1.component';
import {PagesComponent} from './pages.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {PromesasComponent} from './promesas/promesas.component';
import {RxjsComponent} from './rxjs/rxjs.component';
import {ProfileComponent} from './profile/profile.component';
import {UsuariosComponent} from './usuarios/usuarios.component';
import {HospitalesComponent} from './hospitales/hospitales.component';
import {MedicosComponent} from './medicos/medicos.component';
import {MedicoComponent} from './medicos/medico.component';
import {BusquedaComponent} from './busqueda/busqueda.component';
// Guards
import {AdminGuard, LoginGuardGuard} from '../services/service.index';

const pagesRoutes: Routes = [
  // TRUCO Añadir parámetro data a rutas, donde podemos colocar lo que queramos y se podrá leer en destino.
  {
    path: '',
    component: PagesComponent,
    canActivate: [LoginGuardGuard],
    children:
      [
        { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard', descripcion: 'Panel de control'} },
        { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress', descripcion: 'Barras de progreso'} },
        { path: 'graficas1', component: Graficas1Component, data: { titulo: 'Gráficas', descripcion: 'Ejemplos de gráficos'} },
        { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas', descripcion: 'Ejemplos de promesas'} },
        { path: 'rxjs', component: RxjsComponent, data: { titulo: 'RxJs', descripcion: 'Ejemplos de observables'} },
        // tslint:disable-next-line:max-line-length
        { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del tema', descripcion: 'Cambiar color del template'} },
        { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario', descripcion: 'Perfil de usuario'} },
        { path: 'busqueda/:termino', component: BusquedaComponent, data: { titulo: 'Buscador', descripcion: 'Resultado de la búsqueda'} },
        // Mantenimiento
        // tslint:disable-next-line:max-line-length
        {
          path: 'usuarios',
          component: UsuariosComponent,
          canActivate: [ AdminGuard ],
          data: {
            titulo: 'Mantenimiento de usuarios',
            descripcion: 'Mantenimiento de usuarios'
          }
          },
        // tslint:disable-next-line:max-line-length
        { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Mantenimiento de hospitales', descripcion: 'Mantenimiento de hospitales'} },
        // tslint:disable-next-line:max-line-length
        { path: 'medicos', component: MedicosComponent, data: { titulo: 'Mantenimiento de médicos', descripcion: 'Mantenimiento de médicos'} },
        // tslint:disable-next-line:max-line-length
        { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Mantenimiento de médico', descripcion: 'Mantenimiento de médico'} },
        { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
      ]
  }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
