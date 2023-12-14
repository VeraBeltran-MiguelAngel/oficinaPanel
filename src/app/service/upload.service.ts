import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  API :string ="http://localhost/uploadFiles/creaProducto.php";
  // API: string =
  //   'https://olympus.arvispace.com/panelAdmin/conf/creaProducto.php';
  //para guardar los headers que manda el API
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private clienteHttp: HttpClient) {}

  creaProductoConImagenes(formData: any) {
    return this.clienteHttp.post(this.API + '?creaProducto', formData, {
      headers: this.httpHeaders,
    });
  }
}
