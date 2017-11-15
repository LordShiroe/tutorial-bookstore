import { GenerosService } from './../../servicios/generos.service';
import { Genero } from './../../interfaces/genero';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { LibrosService } from './../../servicios/libros.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.component.html',
  styleUrls: ['./actualizar.component.scss']
})
export class ActualizarComponent implements OnInit {
  editarForm: FormGroup;
  actualizado: boolean;
  generos: Genero[];
  constructor(
    private formBuilder: FormBuilder,
    private librosService: LibrosService,
    private generosService: GenerosService,
    private location: Location,
    private route: ActivatedRoute) { }


  ngOnInit() {
    this.editarForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      pages: [''],
      publisher: [''],
      image_url: ['', Validators.required],
      genre: [''],
      buy_url: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.actualizado = false;
    this.route.paramMap
      .switchMap((params: ParamMap) => this.librosService.getLibroPorId(params.get('id')))
      .subscribe(libro => this.editarForm.patchValue(libro));
    this.generosService.getGeneros().subscribe(generos => this.generos = generos);
  }
  onSubmit() {
    if (this.editarForm.valid) {
      this.route.paramMap
        .switchMap((params: ParamMap) => this.librosService.putLibro(params.get('id'), this.editarForm.value))
        .subscribe(res => this.actualizado = true, (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('An error occurred:', err.error.message);
          } else {
            const errores: {} = JSON.parse(err.error).errores;
            Object.keys(errores).forEach(campo => {
              if (this.editarForm.get(campo)) {
                this.editarForm.get(campo).setErrors({ ServerError: errores[campo].msg });
                this.editarForm.get(campo).markAsDirty();
              }
            });
          }
        });
    }
  }

}
