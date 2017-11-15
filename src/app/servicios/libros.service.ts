import { Libro } from './../interfaces/libro';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LibrosService {

  constructor(private http: HttpClient) { }
  private url = 'http://localhost:3000';

  getLibros() {
    const api = this.url + '/api/v1/libros';
    return this.http.get<Libro[]>(api);
  }

  getLibroPorId(_id: string) {
    const api = this.url + '/api/v1/libros/' + _id;
    return this.http.get<Libro>(api);
  }

  postLibro(libro: Libro) {
    const api = this.url + '/api/v1/libros/';
    return this.http.post<Libro>(api, libro);
  }

  putLibro(_id: string, libro: Libro) {
    const api = this.url + '/api/v1/libros/' + _id;
    return this.http.put<Libro>(api, libro);
  }

}
