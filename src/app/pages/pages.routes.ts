import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProgressComponent} from './progress/progress.component';
import {Graficas1Component} from './graficas1/graficas1.component';
import {PagesComponent} from './pages.component';
import {AccountSettingsComponent} from './account-settings/account-settings.component';
import {PromesasComponent} from './promesas/promesas.component';
import {RxjsComponent} from './rxjs/rxjs.component';
import {LoginGuardGuard} from '../services/service.index';
import {ProfileComponent} from './profile/profile.component';

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
        { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del tema', descripcion: 'Cambiar color del template'} },
        { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de usuario', descripcion: 'Perfil de usuario'} },
        { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
      ]
  }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
