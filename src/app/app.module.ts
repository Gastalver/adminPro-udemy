import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Temporal
import { FormsModule} from '@angular/forms';

// Rutas
import {APP_ROUTES} from './app.routes';

// Modulos
import { PagesModule} from './pages/pages.module';
import { SharedModule } from './shared/shared.module';

// Componentes
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule,
    SharedModule,
    FormsModule
  ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
