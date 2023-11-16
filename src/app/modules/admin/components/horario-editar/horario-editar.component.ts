// horario-editar.component.ts

import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { GimnasioService } from 'src/app/service/gimnasio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AbstractControl } from '@angular/forms';
import { MensajeEmergentesComponent } from '../mensaje-emergentes/mensaje-emergentes.component';
import { horarioService } from 'src/app/service/horario.service';

class Horario {
  constructor(
    public diaSemana: string,
    public horaEntrada: string,
    public horaSalida: string,
    public Gimnasio_idGimnasio: string
  ) {}
}

@Component({
  selector: 'app-horario-editar',
  templateUrl: './horario-editar.component.html',
  styleUrls: ['./horario-editar.component.css']
})
export class HorarioEditarComponent implements OnInit {
  formularioHorarios: FormGroup;
  idGimnasio: any;

  // Días de la semana disponibles
  diasSemana = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado', 'Domingo'];

  constructor(
    
    private HorarioService: horarioService,
    public formularioHorario: FormBuilder,
    private router: Router,
    public dialog: MatDialog,
    private activeRoute: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogo: MatDialogRef<HorarioEditarComponent>,
  ) {
    this.idGimnasio = data.idGimnasio; // Accede a idGimnasio desde los datos

    this.formularioHorarios = this.formularioHorario.group({
      horarios: this.formularioHorario.array([]),
    });

    // Consulta los horarios según el ID y estructura los datos para el formulario
    this.HorarioService.consultarHorario(this.idGimnasio).subscribe(
      respuesta => {
        this.diasSemana.forEach(dia => {
          this.agregarHorarioExistente(dia, respuesta);
        });
      }
    );

    
  }

ngOnInit(): void {}
  // Función para agregar un rango horario existente al formulario
  agregarHorarioExistente(diaSemana: string, respuesta: any): void {
    const horarioExistente = respuesta.find((horario: any) => horario.diaSemana === diaSemana);
  
    // Si existe un horario para este día, usa esos valores, de lo contrario, usa valores por defecto
    const horaEntrada = horarioExistente ? horarioExistente.horaEntrada : '';
    const horaSalida = horarioExistente ? horarioExistente.horaSalida : '';
   console.log("aca si");
    const horarioFormGroup = this.formularioHorario.group({
      diaSemana: [diaSemana, Validators.required],
      horaEntrada: [horaEntrada, Validators.required],
      horaSalida: [horaSalida, Validators.required],
    });
    console.log("esto",horarioFormGroup);
  
    const horariosArray = this.formularioHorarios.get('horarios') as FormArray;
    if (horariosArray) {
      horariosArray.push(horarioFormGroup);
    }
    console.log("esto",horariosArray);
  }

  

  // Función para obtener los controles del FormArray
  getHorariosControls(): AbstractControl[]{
    const horariosArray = this.formularioHorarios.get('horarios') as FormArray;
    return horariosArray.controls;
  }

  actualizar() {
    const horarios: Horario[] = this.formularioHorarios.value.horarios;
    console.log("actualizar", this.formularioHorarios.value);
    
    console.log("Datos a enviar:", horarios);
    // Verifica que 'this.formularioHorarios.value' contiene todos los horarios correctamente
    // ...
    
    // Obtén los datos del formulario y envía la solicitud de actualización
    this.HorarioService.actualizarHorario(this.idGimnasio, this.formularioHorarios.value).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        console.log('Actualización exitosa');
        this.dialog.open(MensajeEmergentesComponent, {
          data: `Horario actualizado exitosamente`,
        })
        .afterClosed()
        .subscribe((cerrarDialogo: Boolean) => {
          if (cerrarDialogo) {
            this.dialogo.close();
          } else {
            // Puedes agregar lógica adicional si es necesario
          }
        });
        // Puedes manejar la respuesta del servidor aquí si es necesario
      },
      error: (error) => {
        // Maneja el error
        console.error('Error al actualizar:', error);
        // Puedes mostrar un mensaje de error al usuario si es necesario
      },
      complete: () => {
        // Puedes agregar lógica adicional cuando la operación está completa
      }
    });
    
    // Desuscribirse cuando el componente se destruye (ngOnDestroy)
    // Puedes hacerlo implementando OnDestroy y usando ngOnDestroy
  }
  
  cancelar() {
    this.dialogo.close();
  }
}
