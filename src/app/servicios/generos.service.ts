import { Genero } from './../interfaces/genero';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class GenerosService {

  constructor(private http: HttpClient) { }
  url = 'http://localhost:3000';

  getGeneros() {
    const api = this.url + '/api/v1/generos';
    return this.http.get<Genero[]>(api);
  }

  getGeneroPorId(_id: string) {
    const api = this.url + '/api/v1/generos/' + _id;
    return this.http.get<Genero>(api);
  }

  postGenero(genero: { name: string }) {
    const api = this.url + '/api/v1/generos/';
    return this.http.post<Genero>(api, genero);
  }

  putGenero(_id: string, genero: Genero) {
    const api = this.url + '/api/v1/generos/' + _id;
    return this.http.put<Genero>(api, genero);
  }

  deleteGenero(_id: string) {
    const api = this.url + '/api/v1/generos/' + _id;
    return this.http.delete(api);
  }

}
