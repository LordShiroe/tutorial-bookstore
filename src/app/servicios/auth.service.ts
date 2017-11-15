import { environment } from './../../environments/environment';
import { IUsuario } from './../interfaces/iusuario';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  private url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login = (usuario: IUsuario) => this.http.post(`${this.url}/usuarios/login`, usuario);

  getAuth = (): string => localStorage.getItem('auth');

  isAuth(): boolean {
    const token = JSON.parse(this.getAuth()).token;
    return tokenNotExpired(null, token);
  }
  setLoggedIn(status) {
    this.loggedIn.next(status);
  }
  logout() {
    this.loggedIn.next(false);
  }

}
