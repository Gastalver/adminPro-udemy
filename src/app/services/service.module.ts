// Centralizamos en este módulo todos los servicios que cargaremos  en el app module, para no inflar este.

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {LoginGuardGuard, SettingsService, SharedService, SidebarService, UsuarioService} from './service.index';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    LoginGuardGuard
  ]
})
export class ServiceModule { }
