import { LoginComponent } from './componentes/login/login.component';
import { AuthGuard } from './servicios/auth.guard';
import { RegistroComponent } from './componentes/registro/registro.component';
import { GenerosComponent } from './componentes/generos/generos.component';
import { CrearComponent } from './componentes/crear/crear.component';
import { ActualizarComponent } from './componentes/actualizar/actualizar.component';
import { DetalleComponent } from './componentes/detalle/detalle.component';
import { LibrosComponent } from './componentes/libros/libros.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: LibrosComponent, canActivate: [AuthGuard] },
  { path: 'generos', component: GenerosComponent, canActivate: [AuthGuard] },
  { path: 'detalle/:id', component: DetalleComponent, canActivate: [AuthGuard] },
  { path: 'nuevo', component: CrearComponent, canActivate: [AuthGuard] },
  { path: 'actualizar/:id', component: ActualizarComponent, canActivate: [AuthGuard] },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
