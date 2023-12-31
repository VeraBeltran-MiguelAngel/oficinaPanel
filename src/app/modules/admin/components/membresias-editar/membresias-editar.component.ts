import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MensajeEmergentesComponent } from "../mensaje-emergentes/mensaje-emergentes.component";
import { FormGroup,FormBuilder,Validators  } from '@angular/forms';
import { PlanService } from 'src/app/service/plan.service';
import { GimnasioService } from 'src/app/service/gimnasio.service';
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-membresias-editar',
  templateUrl: './membresias-editar.component.html',
  styleUrls: ['./membresias-editar.component.css']
})
export class MembresiasEditarComponent implements OnInit{

  formularioPlan: FormGroup;
  gimnasio: any;
  
  elID:any;
  constructor(public formulario:FormBuilder,
    private activeRoute: ActivatedRoute, 
    private planService:PlanService,
    private router:Router,
    private gimnasioService: GimnasioService,
    public dialog: MatDialog){
    this.elID=this.activeRoute.snapshot.paramMap.get('id');
    console.log(this.elID);

    this.planService.consultarPlan(this.elID).subscribe(
      respuesta=>{
        console.log(respuesta);
        this.formularioPlan.setValue({
          titulo:respuesta [0]['titulo'],
          detalles:respuesta [0]['detalles'],
          entrenador:respuesta [0]['entrenador'],
          precio:respuesta [0]['precio'],
          duracion:respuesta [0]['duracion'],
          ofertas:respuesta [0]['ofertas'],
          albercaAcc:respuesta [0]['albercaAcc'],
          gymAcc:respuesta [0]['gymAcc'],
          canchaAcc: respuesta [0]['canchaAcc'],
          Gimnasio_idGimnasio: respuesta [0]['Gimnasio_idGimnasio']
        })
      }
    );

    this.formularioPlan=this.formulario.group({
      titulo: ['', Validators.required],
      detalles:['', Validators.required],
      precio:['', Validators.required],
      entrenador:['', Validators.required],
      duracion:['', Validators.required],
      albercaAcc:['', Validators.required],
      gymAcc:['', Validators.required],
      canchaAcc:['', Validators.required],
      ofertas:['', Validators.required],
      Gimnasio_idGimnasio:['', Validators.required]
    })
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

    
  actualizar(){
    this.planService.actualizarPlan(this.elID,this.formularioPlan.value).subscribe(()=>{

      this.dialog.open(MensajeEmergentesComponent, {
        data: `Membresía actualizada exitosamente`,
      })
      .afterClosed()
      .subscribe((cerrarDialogo: Boolean) => {
        if (cerrarDialogo) {
          this.router.navigateByUrl("/admin/listaMembresias");
        } else {
          
        }
      });
    })
  }
}








