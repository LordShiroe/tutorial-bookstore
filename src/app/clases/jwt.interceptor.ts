import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

@Injectable()
export class JWTInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('auth')) {
      const token = JSON.parse(localStorage.getItem('auth')).token || null;
      if (token) {
        req = req.clone({     // Clona la peticion con un nuevo encabezado.
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      }
    }
    // Pasa el control al siguiente interceptor (si existe)
    return next.handle(req);
  }
}
