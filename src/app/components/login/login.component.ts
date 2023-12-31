import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  loginForm: FormGroup;

  //guardar la respuesta del api en un array
  resApi: any[] = [];

  constructor(
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    //esta parte evita que el usuario regrese al login sin desloguearse
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['admin']);
    }
  }


  onSubmit(): void {
    console.log('Hiciste clic en enviar');
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: (respuesta) => {
          console.log("llego");
          if (respuesta[0].rol === 'SuperAdmin') {
            this.toastr.success('Bienvenido administrador', '', {
              positionClass: 'toast-bottom-left',
            });
            console.log(respuesta);
            // Guardamos el registro del usuario en el local storage (en formato cadena)
            this.auth.setUserData(JSON.stringify(respuesta));
            this.router.navigate(['/admin']);
          } else {
            console.log(respuesta);
            this.toastr.error('Tu cuenta no tiene permisos suficientes', 'Error', {
              positionClass: 'toast-bottom-left',
            });
          }
        },
        error: (paramError) => {
          this.toastr.error(paramError, 'Error', {
            positionClass: 'toast-bottom-left',
          });
        },
      });
    }
  }
  

  getErrorMessage() {
    const usernameControl = this.loginForm.get('username');
    if (usernameControl) {
      if (usernameControl.hasError('required')) {
        return 'Por favor ingresa tu correo';
      }
      if (usernameControl.hasError('email')) {
        return 'Por favor ingresa un correo valido';
      }
    }
    return '';
  }
}
