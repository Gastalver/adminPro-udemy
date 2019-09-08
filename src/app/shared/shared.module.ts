// Dependencias
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';

// Pipes module
import {PipesModule} from '../pipes/pipes.module';

// Componentes
import {HeaderComponent} from './header/header.component';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {ModalUploadComponent} from '../components/modal-upload/modal-upload.component';
import {NopagefoundComponent} from './nopagefound/nopagefound.component';

@NgModule({
  declarations: [
    HeaderComponent,
    BreadcrumbsComponent,
    SidebarComponent,
    ModalUploadComponent,
    NopagefoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule
  ],
  exports: [
    HeaderComponent,
    BreadcrumbsComponent,
    SidebarComponent,
    ModalUploadComponent,
    NopagefoundComponent
  ]
})
export class SharedModule { }
