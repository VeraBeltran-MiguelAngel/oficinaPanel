import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
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
import { MessageService } from 'primeng/api'; /**siempre debes importarlo */
import { ToastrService } from 'ngx-toastr';
import { CategoriaService } from 'src/app/service/categoria.service';
import { UploadService } from 'src/app/service/upload.service';

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
  providers: [DatePipe, MessageService],
})
export class CrearProductoComponent implements OnInit {
  fechaCreacion: string;
  form: FormGroup;
  matcher = new MyErrorStateMatcher();
  idCategoria: number;
  listaCategorias: any;
  uploadedFiles: any[] = [];

  constructor(
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private fb: FormBuilder,
    private categoriaService: CategoriaService,
    private uploadService: UploadService
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
        0,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]+$/), //solo numeros enteros
        ]),
      ],
      fechaCreacion: [this.fechaCreacion],
      codigoBarra: [''],
      unidadMedicion: ['NA', Validators.compose([Validators.required])],
      cantidadUnidades: [
        0,
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[0-9]+$/), //solo numeros enteros
        ]),
      ],
      talla: ['NA', Validators.compose([Validators.required])],
      color: [
        'NA',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[^\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/u),
        ]),
      ],
      longitud: ['NA'],
      sabor: [
        'NA',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[^\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/u),
        ]),
      ],
      genero: ['NA', Validators.compose([Validators.required])],
      marca: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[^\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/u),
        ]),
      ],
      files: [[]], // Inicializa el control de archivos como un array vacío
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
  }

  onFileSelect(event: any) {
    // event.files contiene la lista de archivos seleccionados
    const selectedFiles = event.files;

    // Obtén el valor actual del control 'files' en el formulario
    const currentFiles = this.form.get('files')?.value || [];

    // Agrega los nuevos archivos al valor actual
    const updatedFiles = [...currentFiles, ...selectedFiles];

    // Actualiza el valor del control 'files' en el formulario con la nueva lista de archivos
    this.form.patchValue({ files: updatedFiles });
  }

  registrar(): any {
    // const formData = new FormData();
    // formData.append('nombre', this.form.value.nombre);
    // formData.append('descripcion', this.form.value.descripcion);
    // formData.append('idCategoria', this.form.value.idCategoria);
    // formData.append('precioVenta', this.form.value.precioVenta);
    // formData.append('precioCompra', this.form.value.precioCompra);
    // formData.append('descuento', this.form.value.descuento);
    // formData.append('porcentaje', this.form.value.porcentaje);
    // formData.append('fechaCreacion', this.form.value.fechaCreacion);
    // formData.append('codigoBarra', this.form.value.codigoBarra);
    // formData.append('unidadMedicion', this.form.value.unidadMedicion);
    // formData.append('cantidadUnidades', this.form.value.cantidadUnidades);
    // formData.append('talla', this.form.value.talla);
    // formData.append('color', this.form.value.color);
    // formData.append('longitud', this.form.value.longitud);
    // formData.append('sabor', this.form.value.sabor);
    // formData.append('genero', this.form.value.genero);
    // formData.append('marca', this.form.value.marca);

    // // Agregar imágenes al FormData
    // for (const file of this.form.value.files) {
    //   formData.append('files', file);
    // }

    // console.log('Datos de las imagenes:');
    // formData.forEach((value, key) => {
    //   console.log(key, value);
    // });

    // // Construye un objeto que representa los datos del FormData
    // let formDataObject: { [key: string]: FormDataEntryValue } = {};
    // formData.forEach((value, key) => {
    //   formDataObject[key] = value;
    // });
    
    // // Convierte el objeto a JSON
    // let formDataJSON = JSON.stringify(formDataObject);

    // // Puedes imprimir el JSON en la consola para verificar
    // console.log(formDataJSON);

    if (this.form.valid) {
      console.log(this.form.value);
      this.uploadService.creaProductoConImagenes(this.form.value).subscribe({
        next: (respuesta: any) => {
          console.log(respuesta);

          if (respuesta.success) {
            this.toastr.success(respuesta.message, 'Exito', {
              positionClass: 'toast-bottom-left',
            });
          } else {
            this.toastr.error(respuesta.message, 'Error', {
              positionClass: 'toast-bottom-left',
            });
          }
        },
        error: (paramError) => {
          console.error(paramError); // Muestra el error del api en la consola para diagnóstico
          //accedemos al atributo error y al key
          this.toastr.error(paramError.error.message, 'Error', {
            positionClass: 'toast-bottom-left',
          });
        },
      });
    } else {
      this.toastr.error('Completa el formulario', 'Error', {
        positionClass: 'toast-bottom-left',
      });
    }
  }
}
