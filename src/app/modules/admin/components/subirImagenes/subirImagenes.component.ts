import { MessageService } from "primeng/api";
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FileUploadService } from 'src/app/service/file-upload.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'subir-imagenes',
  templateUrl: './subirImagenes.component.html',
  styleUrls: ['./subirImagenes.component.css'],
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubirImagenesComponent {
  uploadedFiles: any[] = [];

  constructor(
    private uploadService: FileUploadService,
    private toastr: ToastrService
  ) {}

  onUpload(event:any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }

    console.log('archivos seleccionados', this.uploadedFiles);

     // Convertir el array de archivos a JSON
     const filesJson = JSON.stringify(this.uploadedFiles);

     console.log('archivosJson',filesJson);
     
    this.uploadService.subirImagenes(this.uploadedFiles).subscribe({
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
    });
  }



  // onUpload(event: any) {  
  //   const formData = new FormData();
  //   for (const file of this.uploadedFiles) {
  //     formData.append('files[]', file);
  //   }

  //   console.log('archivos seleccionados', formData.getAll);

  //   this.uploadService.subirImagenes(formData).subscribe({
  //     next: (respuesta: any) => {
  //       console.log(respuesta);
  //       if (respuesta.success) {
  //         this.toastr.success(respuesta.message, 'Exito', {
  //           positionClass: 'toast-bottom-left',
  //         });
  //       } else {
  //         this.toastr.error(respuesta.message, 'Error', {
  //           positionClass: 'toast-bottom-left',
  //         });
  //       }
  //     },
  //   });
  // }
}
