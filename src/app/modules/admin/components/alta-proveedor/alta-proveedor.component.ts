import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ProveedorService } from 'src/app/service/proveedor.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MensajeEmergentesComponent } from '../mensaje-emergentes/mensaje-emergentes.component';
import { ErrorStateMatcher} from '@angular/material/core'

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, formulario: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = formulario && formulario.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-alta-proveedor',
  templateUrl: './alta-proveedor.component.html',
  styleUrls: ['./alta-proveedor.component.css']
})
export class AltaProveedorComponent {
  formularioProveedor: FormGroup;
  message: string = '';
  hide = true;
  gimnasio: any;

  constructor(
    public formulario: FormBuilder,
    private router: Router,
    private proveedorService: ProveedorService,
    public dialog: MatDialog
  ) {
    this.formularioProveedor = this.formulario.group({
      nombre: ['', Validators.compose([ Validators.required, Validators.pattern(/^[^\d]*$/)])],
      apPaterno: ['', Validators.compose([ Validators.required, Validators.pattern(/^[^\d]*$/)])],
      apMaterno: ['', Validators.compose([ Validators.required, Validators.pattern(/^[^\d]*$/)])],
      razonSocial: ['', Validators.required],
      telefono: ['', Validators.compose([Validators.required, Validators.pattern(/^(0|[1-9][0-9]*)$/)])],
    });
  }

  matcher = new MyErrorStateMatcher();
  ngOnInit(): void {
  }

  cancelar() {
    this.router.navigateByUrl('/admin/gestion-productos');
  }

  enviar(): any {
    console.log(this.formularioProveedor.value);
    // Verifica si el formulario es válido
    if (this.formularioProveedor.valid) {
      this.proveedorService
        .agregarProveedor(this.formularioProveedor.value)
        .subscribe((respuesta) => {
          this.dialog
            .open(MensajeEmergentesComponent, {
              data: `Proveedor agregado exitosamente`,
            })
            .afterClosed()
            .subscribe((cerrarDialogo: Boolean) => {
              if (cerrarDialogo) {
                this.router.navigateByUrl('/admin/lista-proveedor');
              } else {
              }
            });
        });
    } else {
      // El formulario no es válido, muestra un mensaje de error
      this.message = 'Por favor, complete todos los campos requeridos.';
    }
  }
}

