import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlanService } from 'src/app/service/plan.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MensajeEmergentesComponent } from '../mensaje-emergentes/mensaje-emergentes.component';
import { GimnasioService } from 'src/app/service/gimnasio.service';

@Component({
  selector: 'app-membresias',
  templateUrl: './membresias.component.html',
  styleUrls: ['./membresias.component.css'],
})
export class MembresiasComponent implements OnInit {
  formulariodePlan: FormGroup;
  message: string = '';
  hide = true;
  gimnasio: any;

  constructor(
    public formulario: FormBuilder,
    private router: Router,
    private planServive: PlanService,
    private gimnasioService: GimnasioService,
    public dialog: MatDialog
  ) {
    this.formulariodePlan = this.formulario.group({
      titulo: ['', Validators.required],
      detalles: ['', Validators.required],
      precio: ['', Validators.required],
      entrenador: ['', Validators.required],
      ofertas: ['', Validators.required],
      duracion: ['', Validators.required],
      albercaAcc: ['', Validators.required],
      gymAcc: ['', Validators.required],
      canchaAcc: ['', Validators.required],
      Gimnasio_idGimnasio: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.gimnasioService.obternerPlan().subscribe((respuesta) => {
      console.log(respuesta);
      if (Array.isArray(respuesta)) {
        this.gimnasio = respuesta.map((dato) => ({
          value: dato.idGimnasio, // Valor que se enviará al seleccionar
          label: dato.nombreGym, // Etiqueta que se mostrará en el combo
        }));
      } else {
        console.error("La respuesta no es un arreglo.");
      }
    });
  }

  cancelar() {
    this.formulariodePlan.reset(); // Esto restablecerá los valores del formulario
    this.router.navigateByUrl('/admin/listaMembresias');
  }

  enviar(): any {
    console.log(this.formulariodePlan.value);
    // Verifica si el formulario es válido
    if (this.formulariodePlan.valid) {
      this.planServive
        .agregarPlan(this.formulariodePlan.value)
        .subscribe((respuesta) => {
          this.dialog
            .open(MensajeEmergentesComponent, {
              data: `Membresía agregada exitosamente`,
            })
            .afterClosed()
            .subscribe((cerrarDialogo: Boolean) => {
              if (cerrarDialogo) {
                this.router.navigateByUrl('/admin/listaMembresias');
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
