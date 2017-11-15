import { GenerosService } from './../../servicios/generos.service';
import { Genero } from './../../interfaces/genero';
import { LibrosService } from './../../servicios/libros.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '@angular/common';
@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']
})
export class CrearComponent implements OnInit {
  nuevo: FormGroup;
  registrado: boolean;
  generos: Genero[];
  constructor(
    private formBuilder: FormBuilder,
    private librosService: LibrosService,
    private generosService: GenerosService,
    private location: Location) { }

  ngOnInit() {
    this.nuevo = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      pages: [''],
      publisher: [''],
      image_url: ['', Validators.required],
      genre: [''],
      buy_url: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.registrado = false;
    this.generosService.getGeneros().subscribe(generos => this.generos = generos);
  }
  onSubmit() {
    if (this.nuevo.valid) {
      this.librosService.postLibro(this.nuevo.value).subscribe(res => this.registrado = true, (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          const errores: {} = JSON.parse(err.error).errores;
          Object.keys(errores).forEach(campo => {
            if (this.nuevo.get(campo)) {
              this.nuevo.get(campo).setErrors({ ServerError: errores[campo].msg });
              this.nuevo.get(campo).markAsDirty();
            }
          });
        }
      });
    }
  }
}
