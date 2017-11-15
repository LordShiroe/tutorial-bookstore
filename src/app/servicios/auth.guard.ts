import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';

// Protege las rutas para que solo sean accedidas cuando el usuario este logueado.
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    this.authService.setLoggedIn(this.authService.isAuth());
    return this.authService.isLoggedIn.take(1)
      .map((loggedIn: boolean) => {
        if (!loggedIn) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      });
  }
}
