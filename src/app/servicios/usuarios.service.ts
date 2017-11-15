import { IUsuario } from './../interfaces/iusuario';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsuariosService {

  constructor(private http: HttpClient) { }
  private url = environment.apiUrl;

  get = (username: string) => this.http.get(`${this.url}/libros/${username}`);

  crear = (usuario: IUsuario) => this.http.post(`${this.url}/libros`, usuario);

}
