import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProveedorService } from 'src/app/service/proveedor.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MensajeEmergentesComponent } from '../mensaje-emergentes/mensaje-emergentes.component';
import { CategoriaService } from 'src/app/service/categoria.service';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'app-alta-producto',
  templateUrl: './alta-producto.component.html',
  styleUrls: ['./alta-producto.component.css']
})
export class AltaProductoComponent {
  formularioProducto: FormGroup;
  message: string = '';
  hide = true;
  producto: any;
  imagen: File | null = null;
  

  constructor(
    public formulario: FormBuilder,
    private router: Router,
    private productoService: ProductoService,
    private categoriaService: CategoriaService,
    public dialog: MatDialog
  ) {
    this.formularioProducto = this.formulario.group({
      nombre: ['', Validators.required],
      tamaño: ['', Validators.required],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      estatus: ['', Validators.required],
      Categoria_idCategoria: ['', Validators.required],
      imagen: ['']
    });
  }

  ngOnInit(): void {
    this.categoriaService.obternerCategoria().subscribe((respuesta) => {
      console.log(respuesta);
      if (Array.isArray(respuesta)) {
        this.producto = respuesta.map((dato) => ({
          value: dato.idCategoria, // Valor que se enviará al seleccionar
          label: dato.nombre, // Etiqueta que se mostrará en el combo
        }));
      } else {
        console.error("La respuesta no es un arreglo.");
      }
    });
  }

  cancelar() {
    this.router.navigateByUrl('/admin/gestion-productos');
  }



/*  enviar(): any {
    console.log(this.formularioProducto.value);
    // Verifica si el formulario es válido
    if (this.formularioProducto.valid) {
      this.productoService
        .agregarProducto(this.formularioProducto.value)
        .subscribe((respuesta) => {
          this.dialog
            .open(MensajeEmergentesComponent, {
              data: `Producto agregado exitosamente`,
            })
            .afterClosed()
            .subscribe((cerrarDialogo: Boolean) => {
              if (cerrarDialogo) {
                this.router.navigateByUrl('/admin/gestion-productos');
              } else {
              }
            });
        });
    } else {
      // El formulario no es válido, muestra un mensaje de error
      this.message = 'Por favor, complete todos los campos requeridos.';
    }
  }*/
}
