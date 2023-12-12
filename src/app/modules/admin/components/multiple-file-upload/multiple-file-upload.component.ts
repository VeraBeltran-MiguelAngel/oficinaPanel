import { ChangeDetectionStrategy, Component } from '@angular/core';
import { throwError } from 'rxjs';
import { ProductoService } from 'src/app/service/producto.service';

@Component({
  selector: 'multiple-file-upload',
  templateUrl: './multiple-file-upload.component.html',
  styleUrls: ['./multiple-file-upload.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MultipleFileUploadComponent {
  status: 'initial' | 'uploading' | 'success' | 'fail' = 'initial';
  files: File[] = [];

  constructor(private producto: ProductoService) {}

  onChange(event: any) {
    const files = event.target.files;

    if (files.length) {
      this.status = 'initial';
      this.files = files;
      console.log('archivos:', files);
    }
  }

  onUpload() {
    if (this.files.length) {
      const formData = new FormData();

      [...this.files].forEach((file) => {
        formData.append('file', file, file.name);
      });

      this.status = 'uploading';

      this.producto.subirImagenes(formData).subscribe({
        next: () => {
          this.status = 'success';
        },
        error: (error: any) => {
          this.status = 'fail';
          return throwError(() => error);
        },
      });
    }
  }
}
