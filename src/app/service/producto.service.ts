

  import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';
  import { producto } from '../models/producto';
  
  @Injectable({
    providedIn: 'root'
  })
  export class ProductoService {
  
   // API: string = 'http://localhost/plan/producto.php';
   //API: string = 'http://localhost/plan/crearYactualizarP.php'
   API: string =  'https://olympus.arvispace.com/panelAdmin/conf/crearYactualizarP.php';
   API2: string =  'https://olympus.arvispace.com/panelAdmin/conf/joinDetalleProducto.php';
   API3: string =  'https://olympus.arvispace.com/panelAdmin/conf/producto.php';
   //API2: string = 'http://localhost/plan/joinDetalleProducto.php'
   //API3: string = 'http://localhost/plan/producto.php'
  
    constructor(private clienteHttp:HttpClient) {
    }
  
    consultarProductosJ(idProducto: number | null): Observable<any[]> {
      const url = `${this.API2}?idProducto=${idProducto}`;
      return this.clienteHttp.get<any[]>(url);
    }
  
    actualizarProducto(id: any, datosP: any): Observable<any> {
      const url = `${this.API}?actualizar=${id}`;
      return this.clienteHttp.post(url, datosP);
    }
  
    obternerProducto(){
      return this.clienteHttp.get(this.API3)
    }

    consultarProducto(id:any):Observable<any>{
      return this.clienteHttp.get(this.API+"?consultar="+id);
    }
  
    borrarProducto(id:any):Observable<any>{
      return this.clienteHttp.get(this.API+"?borrar="+id)
    }
  
    
    subirImagenes(imagenes : any):Observable<any>{
      return this.clienteHttp.post(this.API+"?subirImagenes",imagenes);
    }
  }
  