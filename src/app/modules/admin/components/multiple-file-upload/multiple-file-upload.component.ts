import { ChangeDetectionStrategy, Component } from '@angular/core';
import { throwError } from 'rxjs';
import { ProductoService } from 'src/app/service/producto.service';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'multiple-file-upload',
  templateUrl: './multiple-file-upload.component.html',
  styleUrls: ['./multiple-file-upload.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleFileUploadComponent {
  status: 'initial' | 'uploading' | 'success' | 'fail' = 'initial';
  files: File[] = [];

  constructor(
    private producto: ProductoService,
    private uploadService: FileUploadService,
    private toastr: ToastrService
  ) {}

  onChange(event: any) {
    const files = event.target.files;

    if (files.length) {
      this.status = 'initial';
      this.files = files;
      console.log('archivos:', files);
    }
  }

  // onUpload() {
  //   if (this.files.length) {
  //     const formData = new FormData();

  //     [...this.files].forEach((file) => {
  //       formData.append('file', file, file.name);
  //     });

  //     this.status = 'uploading';

  //     this.producto.subirImagenes(formData).subscribe({
  //       next: () => {
  //         this.status = 'success';
  //       },
  //       error: (error: any) => {
  //         this.status = 'fail';
  //         return throwError(() => error);
  //       },
  //     });
  //   }
  // }


  // onUpload() {
  //   if (this.files.length) {
  //     const formData = new FormData();

  //     [...this.files].forEach((file) => {
  //       formData.append('file', file, file.name);
  //     });

  //     this.status = 'uploading';

  //     this.uploadService.subirImagenes(formData).subscribe({
  //       next: (respuesta) => {
  //         console.log(respuesta);
  //         this.status = 'success';
  //         if (respuesta.success) {
  //           this.toastr.success(respuesta.message, 'Exito', {
  //             positionClass: 'toast-bottom-left',
  //           });
  //         } else {
  //           this.toastr.error(respuesta.message, 'Error', {
  //             positionClass: 'toast-bottom-left',
  //           });
  //         }
  //       },
  //       error: (paramError) => {
  //         console.error(paramError);
  //         this.status = 'fail';
  //         this.toastr.error(paramError.error.message, 'Error', {
  //           positionClass: 'toast-bottom-left',
  //         });
  //       },
  //     });
  //   }
  // }




  // onUpload() {
  //   if (this.files.length) {
  //     this.status = 'uploading';
  
  //     // Itera sobre los archivos y llama a subirImagen para cada uno
  //     this.files.forEach((file) => {
  //       this.uploadService.subirImagen(file).subscribe({
  //         next: (respuesta) => {
  //           console.log(respuesta);
  //           this.status = 'success';
  //           if (respuesta.success) {
  //             this.toastr.success(respuesta.message, 'Exito', {
  //               positionClass: 'toast-bottom-left',
  //             });
  //           } else {
  //             this.toastr.error(respuesta.message, 'Error', {
  //               positionClass: 'toast-bottom-left',
  //             });
  //           }
  //         },
  //         error: (paramError) => {
  //           console.error(paramError);
  //           this.status = 'fail';
  //           this.toastr.error(paramError.error.message, 'Error', {
  //             positionClass: 'toast-bottom-left',
  //           });
  //         },
  //       });
  //     });
  //   }
  // }
  
}
