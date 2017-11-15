import { Libro } from './../../interfaces/libro';
import { LibrosService } from './../../servicios/libros.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']
})
export class DetalleComponent implements OnInit {
  libro: Libro;
  constructor(
    private librosService: LibrosService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.libro = {
      _id: '',
      title: '',
      description: '',
      author: '',
      pages: '',
      publisher: '',
      image_url: '',
      buy_url: '',
      genre: '',
      create_date: new Date()
    };
    this.route.paramMap
      .switchMap((params: ParamMap) => this.librosService.getLibroPorId(params.get('id')))
      .subscribe(libro => { this.libro = libro; });

  }

}
