import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { proveedor } from '../models/proveedor';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  API: string = 'https://olympus.arvispace.com/conPrincipal/categoria.php';
  constructor(private clienteHttp:HttpClient) {
  }

  agregarCategoria(datosCategoria:proveedor):Observable<any>{
    return this.clienteHttp.post(this.API+"?insertar=1",datosCategoria);
  }

  obternerCategoria(){
    return this.clienteHttp.get(this.API)
  }

  consultarCategoria(id:any):Observable<any>{
    return this.clienteHttp.get(this.API+"?consultar="+id);
  }

  borrarCategoria(id:any):Observable<any>{
    return this.clienteHttp.get(this.API+"?borrar="+id)
  }

  actualizarCategoria(id:any,datosCategoria:any):Observable<any>{
    return this.clienteHttp.post(this.API+"?actualizar="+id,datosCategoria);
  }  

}
