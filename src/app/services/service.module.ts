import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

// Centralizamos en este módulo todos los servicios que cargaremos  en el app module, para no inflar este.

import {
  LoginGuardGuard,
  SettingsService,
  SharedService,
  SidebarService,
  UsuarioService,
  SubirArchivosService,
  ModalUploadService,
  HospitalService,
  MedicoService
} from './service.index';

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
    LoginGuardGuard,
    SubirArchivosService,
    ModalUploadService,
    HospitalService,
    MedicoService
  ]
})
export class ServiceModule { }
