import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Temporal
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// Rutas
import {APP_ROUTES} from './app.routes';

// Modulos propios
// Pages Module lo cargamos mediante lazy upload, no directamente.
// import { PagesModule} from './pages/pages.module';
import { SharedModule } from './shared/shared.module';

// Servicios.
import { ServiceModule} from './services/service.module';

// Componentes. Aconsejable que sean los estrictamente imprescindibles para login o
// registro, para que carque ultra rápido. Y que el resto se cargue mediante
// lazy loading.
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent} from './pages/pages.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    // PagesModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
