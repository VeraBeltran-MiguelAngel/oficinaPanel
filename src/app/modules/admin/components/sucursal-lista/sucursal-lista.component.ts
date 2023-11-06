import { Component, OnInit } from '@angular/core';
import { GimnasioService } from 'src/app/service/gimnasio.service';
import { MensajeEliminarComponent } from '../mensaje-eliminar/mensaje-eliminar.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { horarioService } from 'src/app/service/horario.service';
import { forkJoin } from 'rxjs';
import { HorariosComponent } from '../horarios/horarios.component';
import { gimnasio } from 'src/app/service/gimnasio';

@Component({
  selector: 'app-sucursal-lista',
  templateUrl: './sucursal-lista.component.html',
  styleUrls: ['./sucursal-lista.component.css']
})
export class SucursalListaComponent implements OnInit {
  gimnasio: any;
  message: string = "";
  
  constructor(
    private gimnasioService: GimnasioService,
    public dialog: MatDialog,
  ){}

  displayedColumns: string[] = ['title', 'c.p','estado','ciudad','colonia','calle','Numero_Exterior','Numero_Interior','telefono', 'tipo',  'alberca', 'ofertas', 'gimnasio', 'IDgimnasio', 'actions'];


  ngOnInit(): void {
    this.gimnasioService.obternerPlan().subscribe(respuesta => {
      this.gimnasio = respuesta;
    });
  }

  borrarSucursal(idGimnasio: any) {
    console.log(idGimnasio);
    this.dialog.open(MensajeEliminarComponent, {
      data: `¿Desea eliminar esta membresía?`,
    })
    .afterClosed()
    .subscribe((confirmado: boolean) => {
      if (confirmado) {
        this.gimnasioService.borrarSucursal(idGimnasio).subscribe(
          (respuesta) => {
            console.log("Eliminado exitosamente");
            window.location.reload();
          },
          (error) => {
            console.log("Error al eliminar:", error);
            this.message = "¡Error al eliminar!, Restricción en la base de datos";
          }
        );
      } else {
        console.log("No se confirmó la eliminación");
      }
    });
  }

  verHorario(idGimnasio: string): void {
    const dialogRef = this.dialog.open(HorariosComponent, {
      data: { idGimnasio: idGimnasio },
    });
  }
}
