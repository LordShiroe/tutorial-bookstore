import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './../../servicios/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  onSubmit() {
    console.log('submit');
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
        .subscribe(authJSON => {
          localStorage.setItem('auth', JSON.stringify(authJSON));
          this.authService.setLoggedIn(true);
          this.router.navigate(['']);
        }, (err: HttpErrorResponse) => {
          if (err.error instanceof Error) {
            console.log('Un error ha ocurrido:', err.error.message);
          } else {
            if (err.status === 422) {
              const errores: {} = JSON.parse(err.error).errores || {};
              Object.keys(errores).forEach(campo => {
                if (this.loginForm.get(campo)) {
                  this.loginForm.get(campo).setErrors({ ServerError: errores[campo].msg });
                  this.loginForm.get(campo).markAsDirty();
                }
              });
            }
          }
        });
    }
  }
}
