import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm, FormArray , FormControl} from "@angular/forms";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { GimnasioService } from 'src/app/service/gimnasio.service';
import { franquiciaService } from 'src/app/service/franquicia.service';
import { ErrorStateMatcher} from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { gimnasio } from 'src/app/models/gimnasio';
import { MensajeEmergentesComponent } from '../mensaje-emergentes/mensaje-emergentes.component';
import { AbstractControl } from '@angular/forms';

class Horario {
  constructor(
    public diaSemana: string,
    public horaEntrada: string,
    public horaSalida: string,
    public Gimnasio_idGimnasio: string
  ) {}
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, formulario: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = formulario && formulario.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-sucursal-alta',
  templateUrl: './sucursal-alta.component.html',
  styleUrls: ['./sucursal-alta.component.css']
})
export class SucursalAltaComponent implements OnInit {
  formularioSucursales: FormGroup;
  message: string = "";
  franquicia: any;
  idSucursal!: string;

  constructor(
    public formulario: FormBuilder,
    public formularioHorario: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private gimnasioService: GimnasioService,
    private FranquiciaService: franquiciaService
    
  ){
    this.formularioSucursales = this.formulario.group({
      nombreGym: ["", Validators.required],
      codigoPostal: ["", Validators.required],
      estado: ["", Validators.required],
      ciudad: ["", Validators.required],
      colonia: ["", Validators.required],
      calle: ["", Validators.required],
      numExt: ["", Validators.required],
      numInt: [""],
      telefono:  ['', Validators.compose([Validators.required, Validators.pattern(/^(0|[1-9][0-9]*)$/)])],
      tipo: ["", Validators.required],
      Franquicia_idFranquicia: ["", Validators.required],
      casilleros: ["", Validators.required],
      estacionamiento: ["", Validators.required],
      regaderas: ["", Validators.required],
      bicicletero: ["", Validators.required]
    }); 
     // Agregar mensaje de error personalizado si el campo "telefono" no es válido
     if (this.formularioSucursales) {
      const telefonoControl = this.formularioSucursales.get('telefono');
      if (telefonoControl) {
        telefonoControl.setErrors({
          invalidPhoneNumber: true
        });
      }
    }   
 }

 matcher = new MyErrorStateMatcher();
  ngOnInit(): void {
    this.FranquiciaService.obternerFran().subscribe((respuesta) => {
      console.log(respuesta);
      if (Array.isArray(respuesta)) {
        this.franquicia = respuesta.map((dato) => ({
          value: dato.idFranquicia, // Valor que se enviará al seleccionar
          label: dato.nombre, // Etiqueta que se mostrará en el combo
        }));
      } else {
        console.error("La respuesta no es un arreglo.");
      }
    });    
  }

  cancelar() {
    this.router.navigateByUrl("/admin/lista-sucursales");
  }

  enviarForm(): void {
    console.log(this.formularioSucursales.value);
    // Verifica si el formulario de sucursales es válido
    if (this.formularioSucursales.valid) {
      // Llama al servicio para agregar la sucursal
      this.gimnasioService.agregarSucursal(this.formularioSucursales.value).subscribe((respuesta) => {
        // Abre el diálogo y redirige después de cerrarlo
        this.dialog.open(MensajeEmergentesComponent, {
          data: `Sucursal agregada exitosamente`,
        }).afterClosed().subscribe((cerrarDialogo: Boolean) => {
          if (cerrarDialogo) {
            this.router.navigateByUrl("/admin/lista-sucursales");
          } else {
          }
        });
      });
    } else {
      this.message = "Por favor, complete todos los campos requeridos.";
    }
  }
}















