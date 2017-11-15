import { LibrosService } from './../../servicios/libros.service';
import { Libro } from './../../interfaces/libro';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-libros',
  templateUrl: './libros.component.html',
  styleUrls: ['./libros.component.scss']
})
export class LibrosComponent implements OnInit {
  libros: Libro[];
  constructor(private libroService: LibrosService) { }

  ngOnInit() {
    this.libroService.getLibros().subscribe(data => { this.libros = data; });
  }

}
