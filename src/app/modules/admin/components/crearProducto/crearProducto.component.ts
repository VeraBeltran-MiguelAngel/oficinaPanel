import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from 'src/app/service/categoria.service';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    formulario: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = formulario && formulario.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}
@Component({
  selector: 'crear-producto',
  templateUrl: './crearProducto.component.html',
  styleUrls: ['./crearProducto.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe],
})
export class CrearProductoComponent implements OnInit {
  fechaCreacion: string;
  form: FormGroup;
  matcher = new MyErrorStateMatcher();
  idCategoria: number;
  listaCategorias: any;

  constructor(
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private categoriaService: CategoriaService
  ) {
    this.fechaCreacion = this.obtenerFechaActual();
    // formulario
    this.form = this.fb.group({
      nombre: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[^\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/u),
        ]),
      ],
      descripcion: ['', Validators.required],
      idCategoria: ['', Validators.compose([Validators.required])],
      precioVenta: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^\d+(\.\d{0,2})?$/), //solo acepta dos decimales
        ]),
      ],
      precioCompra: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^\d+(\.\d{0,2})?$/), //solo acepta dos decimales
        ]),
      ],

      descuento: ['', Validators.required],
      porcentaje: [
        '0',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]+$/), //solo numeros enteros
        ]),
      ],
      fechaCreacion: [this.fechaCreacion],
      codigoBarra: [''],
      unidadMedicion: ['S/E', Validators.compose([Validators.required])],
      cantidadUnidades: [
        '0',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]+$/), //solo numeros enteros
        ]),
      ],
      talla: ['S/E', Validators.compose([Validators.required])],
      color: [
        'SE',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[^\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/u),
        ]),
      ],
      longitud: [''],
      sabor: [
        'SE',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[^\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/u),
        ]),
      ],
      genero: ['S/E', Validators.compose([Validators.required])],
      marca: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[^\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/u),
        ]),
      ],
    });
  }

  ngOnInit(): void {
    this.categoriaService.obternerCategoria().subscribe({
      next: (respuesta) => {
        this.listaCategorias = respuesta;
        console.log('lista de categorias:', this.listaCategorias);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  obtenerFechaActual(): string {
    const fechaActual = new Date();
    return this.datePipe.transform(fechaActual, 'yyyy-MM-dd HH:mm:ss') || '';
  }

  /**
   * Metodo que se invoca cada que selecionas una opcion del select
   * @param event
   */
  infoCategoria(event: number) {
    console.log('Opción seleccionada:', event);
    this.idCategoria = event;
    console.log('valor idCategoria:', this.idCategoria);
    this.cdr.detectChanges(); // Forzar la actualización del componente
  }

  registrar(): any {}
}
