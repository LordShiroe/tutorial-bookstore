import { GenerosService } from './../../servicios/generos.service';
import { Genero } from './../../interfaces/genero';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-generos',
  templateUrl: './generos.component.html',
  styleUrls: ['./generos.component.scss']
})
export class GenerosComponent implements OnInit {
  generos: Genero[];
  name = new FormControl();
  constructor(private generosService: GenerosService) { }

  ngOnInit() {
    this.listarGeneros();
  }

  listarGeneros() {
    this.generosService.getGeneros().subscribe(generos => this.generos = generos);
  }

  eliminar(genero: Genero) {
    this.generosService.deleteGenero(genero._id).subscribe(res => this.listarGeneros());
  }
  registrar() {
    this.generosService.postGenero({ name: this.name.value }).subscribe(res => { this.listarGeneros(); this.name.reset(); });
  }
  actualizar(genero: Genero) {
    this.generosService.putGenero(genero._id, genero).subscribe(res => this.listarGeneros());
  }


}
