import { AuthGuard } from './servicios/auth.guard';
import { AuthService } from './servicios/auth.service';
import { JWTInterceptor } from './clases/jwt.interceptor';
import { UsuariosService } from './servicios/usuarios.service';
import { GenerosService } from './servicios/generos.service';
import { CrearComponent } from './componentes/crear/crear.component';
import { LibrosService } from './servicios/libros.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { LibrosComponent } from './componentes/libros/libros.component';
import { DetalleComponent } from './componentes/detalle/detalle.component';

import { ActualizarComponent } from './componentes/actualizar/actualizar.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ExcerptPipe } from './pipes/excerpt.pipe';
import { GenerosComponent } from './componentes/generos/generos.component';
import { ErrorInputComponent } from './componentes/error-input/error-input.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { LoginComponent } from './componentes/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LibrosComponent,
    DetalleComponent,
    CrearComponent,
    ActualizarComponent,
    ExcerptPipe,
    GenerosComponent,
    ErrorInputComponent,
    RegistroComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTInterceptor,
      multi: true
    },
    LibrosService,
    GenerosService,
    UsuariosService,
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
