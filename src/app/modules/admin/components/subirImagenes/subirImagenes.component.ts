import { MessageService } from 'primeng/api';
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
    private messageService: MessageService,
    private uploadService: FileUploadService,
    private toastr: ToastrService
  ) {}

  // onUpload(event:any) {
  //   for (let file of event.files) {
  //     this.uploadedFiles.push(file);
  //   }
  //   this.uploadService.subirImagenes().subscribe({
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
  //     error: (paramError) => {
  //       console.error(paramError);
  //       this.toastr.error(paramError.error.message, 'Error', {
  //         positionClass: 'toast-bottom-left',
  //       });
  //     },
  //   });

  // }

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
    this.toastr.success('Imagenes cargadas', 'Exito', {
      positionClass: 'toast-bottom-left',
    });
  }
}
