import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {SidebarComponent} from './sidebar/sidebar.component';
import {BreadcrumbsComponent} from './breadcrumbs/breadcrumbs.component';
import {HeaderComponent} from './header/header.component';
import {NopagefoundComponent} from './nopagefound/nopagefound.component';

@NgModule({
  declarations: [
    SidebarComponent,
    BreadcrumbsComponent,
    HeaderComponent,
    NopagefoundComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SidebarComponent,
    BreadcrumbsComponent,
    HeaderComponent,
    NopagefoundComponent
  ]
})
export class SharedModule { }
