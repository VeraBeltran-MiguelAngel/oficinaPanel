import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { plan } from 'src/app/service/plan';
import { PlanService } from 'src/app/service/plan.service';
import { MensajeEliminarComponent } from '../mensaje-eliminar/mensaje-eliminar.component';


@Component({
  selector: 'app-membresias-lista',
  templateUrl: './membresias-lista.component.html',
  styleUrls: ['./membresias-lista.component.css']
})
export class MembresiasListaComponent implements OnInit{
  plan: any;
  message: string = "";

  constructor(
    private planService:PlanService,
    private router: Router,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    public dialog: MatDialog
  ){}

  displayedColumns: string[] = ['id','title','trainer', 'price', 'duration', 'details','cancha','alberca','ofertas','gimnasio','IDgimnasio','actions'];

  ngOnInit(): void {
    this.planService.obternerPlan().subscribe(respuesta=>{console.log(respuesta)
    this.plan=respuesta;
    });
    
  }

  borrarPlan(idMem: any) {
    console.log(idMem);
    this.dialog.open(MensajeEliminarComponent, {
      data: `¿Desea eliminar esta membresía?`,
    })
    .afterClosed()
      .subscribe((confirmado: Boolean) => {
        if (confirmado) {
          this.planService.borrarPlan(idMem).subscribe((respuesta) => {
            console.log("si entro") 
            window.location.reload();       
          },
          (error) => {
            console.log("Error al eliminar:", error);
            this.message = "¡Error al eliminar! Hay clientes inscritos en esta membresía";
            setTimeout(() => {
              this.message = ''; // Ocultar el mensaje de error después de 20 segundos
            }, 7000); // 20000 milisegundos = 20 segundos
          });
        } else {
          
        }
      });
   }
}





 
  

     



    
    
    
    
  


