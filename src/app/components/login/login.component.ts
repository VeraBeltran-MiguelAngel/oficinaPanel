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
    if (this.auth.isLoggedIn()) {
      this.router.navigate(['cliente']);
    }
  }

  onSubmit(): void {
    console.log('Hiciste clic en enviar');
    //imprime los datos recibidos del formulario
    console.log(this.loginForm.value);

    if (this.loginForm.valid) {
      this.auth.login(this.loginForm.value).subscribe({
        next: (respuesta) => {
          this.toastr.success('Bienvenido', '', {
            positionClass: 'toast-bottom-left',
          });
          console.log(respuesta);
          //guardamos el registro del usuario en el local storage
          this.auth.setUserData(JSON.stringify(respuesta));
          this.router.navigate(['/cliente']);
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
