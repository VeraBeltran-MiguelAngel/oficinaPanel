import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MensajeEmergentesComponent } from "../mensaje-emergentes/mensaje-emergentes.component";
import { FormGroup,FormBuilder,Validators  } from '@angular/forms';
import { ProveedorService } from 'src/app/service/proveedor.service';
import { GimnasioService } from 'src/app/service/gimnasio.service';
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-editar-proveedor',
  templateUrl: './editar-proveedor.component.html',
  styleUrls: ['./editar-proveedor.component.css']
})
export class EditarProveedorComponent {

  formularioProveedor: FormGroup;
  gimnasio: any;
  message: string = '';
  
  elID:any;
  constructor(public formulario:FormBuilder,
    private activeRoute: ActivatedRoute, 
    private proveedorService:ProveedorService,
    private router:Router,
    private gimnasioService: GimnasioService,
    public dialog: MatDialog){
    this.elID=this.activeRoute.snapshot.paramMap.get('id');
    console.log(this.elID);

    this.proveedorService.consultarProveedor(this.elID).subscribe(
      respuesta=>{
        console.log(respuesta);
        this.formularioProveedor.setValue({
          nombre:respuesta [0]['nombre'],
          apPaterno:respuesta [0]['apPaterno'],
          apMaterno:respuesta [0]['apMaterno'],
          razonSocial:respuesta [0]['razonSocial'],
          telefono:respuesta [0]['telefono']
        })
      }
    );

    this.formularioProveedor=this.formulario.group({
      nombre: ['', Validators.compose([ Validators.required, Validators.pattern(/^[^\d]*$/)])],
      apPaterno: ['', Validators.compose([ Validators.required, Validators.pattern(/^[^\d]*$/)])],
      apMaterno: ['', Validators.compose([ Validators.required, Validators.pattern(/^[^\d]*$/)])],
      razonSocial: ['', Validators.required],
      telefono: ['', Validators.compose([Validators.required, Validators.pattern(/^(0|[1-9][0-9]*)$/)])]
    })
  }

  ngOnInit(): void {
  }

  cancelar() {
    this.router.navigateByUrl('/admin/gestion-productos');
  }

    
  actualizar(){
    if (this.formularioProveedor.valid) {
    this.proveedorService.actualizarProveedor(this.elID,this.formularioProveedor.value).subscribe(()=>{

      this.dialog.open(MensajeEmergentesComponent, {
        data: `Proveedor actualizado exitosamente`,
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






