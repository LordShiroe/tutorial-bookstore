import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuariosService } from './../../servicios/usuarios.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  registrarForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuariosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.registrarForm = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  onSubmit() {
    if (this.registrarForm.valid) {
      this.usuarioService.crear(this.registrarForm.value)
        .subscribe(authJSON => {
          localStorage.setItem('auth', JSON.stringify(authJSON));
          this.router.navigate(['']);
        }, (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('Un error ha ocurrido:', err.error.message);
          } else {
            if (err.status === 422) {
              const errores: {} = JSON.parse(err.error).errores || {};
              Object.keys(errores).forEach(campo => {
                if (this.registrarForm.get(campo)) {
                  this.registrarForm.get(campo).setErrors({ ServerError: errores[campo].msg });
                  this.registrarForm.get(campo).markAsDirty();
                }
              });
            }
          }
        });
    }
  }
}
