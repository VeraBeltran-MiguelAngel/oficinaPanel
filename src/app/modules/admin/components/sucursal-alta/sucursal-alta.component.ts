import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective, NgForm, FormArray , FormControl} from "@angular/forms";

import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { GimnasioService } from 'src/app/service/gimnasio.service';
import { franquiciaService } from 'src/app/service/franquicia.service';
import {ErrorStateMatcher} from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { gimnasio } from 'src/app/service/gimnasio';
import { MensajeEmergentesComponent } from '../mensaje-emergentes/mensaje-emergentes.component';

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
  diasSemana = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
 
  

  formularioSucursales: FormGroup;
  message: string = "";
  horaEntrada: string = ''; // Variable para la hora de entrada
  horaSalida: string = ''; // Variable para la hora de salida
  horarioCompleto: string = '';
  franquicia: any;

  checkboxValue =false;
  inputDisabled=true;

  constructor(
    public formulario: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private gimnasioService: GimnasioService,
    private FranquiciaService: franquiciaService
    
  ) {
    this.formularioSucursales = this.formulario.group({
      nombreGym: ["", Validators.required],
      telefono:  ['', Validators.compose([Validators.required, Validators.pattern(/^(0|[1-9][0-9]*)$/)])],
      tipo: ["", Validators.required],
      Franquicia_idFranquicia: ["", Validators.required],
      horarios: this.formulario.group({
        lunes: ["Lunes"],
        horaInicioLunes: { value: '', disabled: true },
        horaFinLunes: { value: '', disabled: true },
        martes: ["Martes"],
        horaIniciomartes: { value: '', disabled: true },
        horaFinmartes: { value: '', disabled: true },
        miercoles: ["Miercoles"],
        horaIniciomiercoles: { value: '', disabled: true },
        horaFinmiercoles: { value: '', disabled: true },
        jueves: ["Jueves"],
        horaIniciojueves: { value: '', disabled: true },
        horaFinjueves: { value: '', disabled: true },
        viernes: ["Viernes"],
        horaInicioviernes: { value: '', disabled: true },
        horaFinviernes: { value: '', disabled: true },
        sabado: ["Sabado"],
        horaIniciosabado: { value: '', disabled: true },
        horaFinsabado: { value: '', disabled: true },
        domingo: ["Domingo"],
        horaIniciodomingo: { value: '', disabled: true },
        horaFindomingo: { value: '', disabled: true }
        
      }),
      casilleros: ["", Validators.required],
      estacionamiento: ["", Validators.required],
      energia: ["", Validators.required],
      bicicletero: ["", Validators.required],
      codigoPostal: ["", Validators.required],
      estado: ["", Validators.required],
      ciudad: ["", Validators.required],
      colonia: ["", Validators.required],
      calle: ["", Validators.required],
      numExt: ["", Validators.required],
      numInt: ["", Validators.required],
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

    const formData = this.formularioSucursales.value;

    const resultadoConcatenado = formData.horarios.lunes + ' - ' + formData.horarios.horaInicioLunes;
    console.log(resultadoConcatenado);
    
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
    this.formularioSucursales.reset(); // restablece formulario
    this.router.navigateByUrl("/gimnasioLista");
  }

  funciones(event: MatCheckboxChange, horaInicioControlName: string, horaFinControlName: string) {
    const checkbox = event.checked;
    const horaInicio = this.formularioSucursales.get(`horarios.${horaInicioControlName}`);
    const horaFin = this.formularioSucursales.get(`horarios.${horaFinControlName}`);

    if (checkbox) {
      horaInicio?.enable();
      horaFin?.enable();
      console.log(`${horaInicioControlName} habilitado`);
    } else {
      horaInicio?.disable();
      horaFin?.disable();
      console.log(`${horaInicioControlName} deshabilitado`);
    }
  }

  enviar(): void {
    const formData = this.formularioSucursales.value;

    /*const resultadoConcatenado =`{"horarios": {
      "${formData.horarios.lunes}": {
        "horaInicioLunes": "${formData.horarios.horaInicioLunes}",
        "horaFinLunes": "${formData.horarios.horaFinLunes}"
      }, 
      "${formData.horarios.martes}": {
        "horaIniciomartes": "${formData.horarios.horaIniciomartes}",
        "horaFinmartes": "${formData.horarios.horaFinmartes}"
      },
      "${formData.horarios.miercoles}": {
        "horaIniciomiercoles": "${formData.horarios.horaIniciomiercoles}",
        "horaFinmiercoles": "${formData.horarios.horaFinmiercoles}"
      },
      "${formData.horarios.jueves}": {
        "horaIniciojueves": "${formData.horarios.horaIniciojueves}",
        "horaFinjueves": "${formData.horarios.horaFinjueves}"
      },
      "${formData.horarios.viernes}": {
        "horaInicioviernes": "${formData.horarios.horaInicioviernes}",
        "horaFinviernes": "${formData.horarios.horaFinviernes}"
      },
      "${formData.horarios.sabado}": {
        "horaIniciosabado": "${formData.horarios.horaIniciosabado}",
        "horaFinsabado": "${formData.horarios.horaFinsabado}"
      },
      "${formData.horarios.domingo}": {
        "horaIniciodomingo": "${formData.horarios.horaIniciodomingo}",
        "horaFindomingo": "${formData.horarios.horaFindomingo}"
      }
    }}`;

    console.log("prueba", resultadoConcatenado);

    console.log(this.formularioSucursales.value);*/
    if (this.formularioSucursales.valid) {
      console.log(this.formularioSucursales.value);

      //const objetoJSON = JSON.parse(resultadoConcatenado);
      //console.log("res"+resultadoConcatenado);


/*const horarios: { [key: string]: { horaInicio: string; horaFin: string } } = {};

// Nombres de los días de la semana
const diasSemana = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];

// Itera sobre los días de la semana
for (const dia of diasSemana) {
  // Verifica si el día tiene valores
  if (formData.horarios[dia]) {
    // Agrega el objeto del día al objeto de horarios
    horarios[dia] = {
      horaInicio: formData.horarios[`horaInicio${dia}`],
      horaFin: formData.horarios[`horaFin${dia}`]
    };
  }
}

const resultadoConcatenado = JSON.stringify({ horarios });

console.log(resultadoConcatenado);*/
let horarios: { horarios: { [key: string]: { horaInicio: string; horaFin: string } } } = { horarios: {} };

// Nombres de los días de la semana
const diasSemana = ["lunes", "martes", "miercoles", "jueves", "viernes", "sabado", "domingo"];

// Itera sobre los días de la semana
for (const dia of diasSemana) {
  // Verifica si el día tiene valores
  if (formData.horarios[dia]) {
    horarios.horarios[dia] = {
      horaInicio: formData.horarios[`horaInicio${dia}`] || "",
      horaFin: formData.horarios[`horaFin${dia}`] || ""
    };
  }
}

const resultadoConcatenado = JSON.stringify(horarios);

console.log(horarios);




const datosParaEnviar = new gimnasio();
datosParaEnviar.nombreGym = this.formularioSucursales.value.nombreGym; // Reemplaza con el campo real del formulario
datosParaEnviar.telefono = this.formularioSucursales.value.telefono; // Reemplaza con el campo real del formulario
datosParaEnviar.tipo = this.formularioSucursales.value.tipo; // Reemplaza con el campo real del formulario
datosParaEnviar.Franquicia_idFranquicia = this.formularioSucursales.value.Franquicia_idFranquicia; // Asigna el valor adecuado
datosParaEnviar.horarios = resultadoConcatenado; // Asigna la cadena JSON
datosParaEnviar.casilleros =  this.formularioSucursales.value.casilleros; 
datosParaEnviar.estacionamiento = this.formularioSucursales.value.estacionamiento;// Asigna el valor adecuado
datosParaEnviar.energia = this.formularioSucursales.value.energia;// Asigna el valor adecuado
datosParaEnviar.bicicletero = this.formularioSucursales.value.bicicletero; // Asigna el valor adecuado
datosParaEnviar.codigoPostal = this.formularioSucursales.value.codigoPostal; // Reemplaza con el campo real del formulario
datosParaEnviar.estado = this.formularioSucursales.value.estado; // Reemplaza con el campo real del formulario
datosParaEnviar.ciudad = this.formularioSucursales.value.ciudad; // Reemplaza con el campo real del formulario
datosParaEnviar.colonia = this.formularioSucursales.value.colonia; // Reemplaza con el campo real del formulario
datosParaEnviar.calle = this.formularioSucursales.value.calle; // Reemplaza con el campo real del formulario
datosParaEnviar.numExt = this.formularioSucursales.value.numExt; // Reemplaza con el campo real del formulario
datosParaEnviar.numInt = this.formularioSucursales.value.numInt; // Reemplaza con el campo real del formulario

console.log("checar"+JSON.stringify(datosParaEnviar, null, 2))

console.log("formulario"+this.formularioSucursales.value);
       this.gimnasioService.agregarSucursal(datosParaEnviar).subscribe(
        (respuesta) => {
          this.dialog.open(MensajeEmergentesComponent, {
            data: `Sucursal agregada exitosamente`,
          }).afterClosed().subscribe((cerrarDiálogo: boolean) => {
            if (cerrarDiálogo) {
              this.router.navigateByUrl("/gimnasioLista");
            }
          });
        },
        (error) => {
          console.error("Error al agregar sucursal:", error);
        }
      );
    } else {
      this.message = "Por favor, complete todos los campos requeridos.";
    }
  }   

}
