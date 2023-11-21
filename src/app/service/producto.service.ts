import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { producto } from './producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  API: string = 'http://localhost/plan/producto.php';
  constructor(private clienteHttp:HttpClient) {
  }

  agregarProducto(datosProducto:producto):Observable<any>{
    return this.clienteHttp.post(this.API+"?insertar=1",datosProducto);
  }

  obternerProducto(){
    return this.clienteHttp.get(this.API)
  }

  consultarProducto(id:any):Observable<any>{
    return this.clienteHttp.get(this.API+"?consultar="+id);
  }

  borrarProducto(id:any):Observable<any>{
    return this.clienteHttp.get(this.API+"?borrar="+id)
  }

  actualizarProducto(id:any,datosProducto:any):Observable<any>{
    return this.clienteHttp.post(this.API+"?actualizar="+id,datosProducto);
  }  
}
