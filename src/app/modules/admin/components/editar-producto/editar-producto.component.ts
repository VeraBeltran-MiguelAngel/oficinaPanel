
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ColaboradorService } from 'src/app/service/colaborador.service';
import { ProductoService } from 'src/app/service/producto.service';
import { MatDialog } from "@angular/material/dialog";
import { MensajeEmergentesComponent } from "../mensaje-emergentes/mensaje-emergentes.component";
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, formulario: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = formulario && formulario.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent {
  formularioProducto: FormGroup;
  gimnasio: any;
  message: string = '';
  producto: any;
  elID:any;

  constructor(public formulario:FormBuilder,
    private activeRoute: ActivatedRoute, 
    private productoService:ProductoService,
    private router:Router,
    public dialog: MatDialog){
    this.elID=this.activeRoute.snapshot.paramMap.get('id');
    console.log(this.elID);

    //llamar al servicio datos empleado - pasando el parametro capturado por url
    this.productoService.consultarProducto(this.elID).subscribe(
      respuesta=>{
        //asignar valor a los campos correspondientes al fomulario
        this.formularioProducto.setValue({
          nombre:respuesta [0]['nombre'],
          tamaño:respuesta [0]['tamaño'],
          descripcion:respuesta [0]['descripcion'],
          precio:respuesta [0]['precio'],
          cantidad:respuesta [0]['cantidad'],
          estatus:respuesta [0]['estatus'],
          Categoria_idCategoria:respuesta [0]['Categoria_idCategoria']
        });
      }
    );


    //asignar validaciones a los campos de fomulario
    this.formularioProducto = this.formulario.group({
      nombre: ['', Validators.required],
      tamaño: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      cantidad: ['', Validators.required],
      estatus: ['', Validators.required],
      Categoria_idCategoria: ['', Validators.required]
    });
  }

  //insanciar objeto para manejar el tipo de error en las validaciones
  matcher = new MyErrorStateMatcher();

  //mandar a llamar el sevicio correspondiente al llenado del combo sucursal
  ngOnInit():void{
    this.productoService.obternerProducto().subscribe((respuesta) => {
      console.log(respuesta);
      if (Array.isArray(respuesta)) {
        this.producto = respuesta.map((dato) => ({
          value: dato.idProducto, // Valor que se enviará al seleccionar
          label: dato.nombre, // Etiqueta que se mostrará en el combo
        }));
      } else {
        console.error("La respuesta no es un arreglo.");
      }
    });
  }

  cancelar() {
    this.router.navigateByUrl('/admin/lista-producto');
  }

  actualizar(){
    if (this.formularioProducto.valid) {
    this.productoService.actualizarProducto(this.elID,this.formularioProducto.value).subscribe(()=>{

      this.dialog.open(MensajeEmergentesComponent, {
        data: `Producto actualizado exitosamente`,
      })
      .afterClosed()
      .subscribe((cerrarDialogo: Boolean) => {
        if (cerrarDialogo) {
          this.router.navigateByUrl('/admin/lista-producto');
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
