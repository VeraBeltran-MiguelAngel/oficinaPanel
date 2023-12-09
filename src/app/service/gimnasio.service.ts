import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { gimnasio } from '../models/gimnasio';

@Injectable({
  providedIn: 'root'
})
export class GimnasioService {

  API: string = 'https://olympus.arvispace.com/conPrincipal/gimnasio.php'
  constructor(private clienteHttp:HttpClient) {
  }

  obternerPlan(){
    return this.clienteHttp.get(this.API)
  }

  // Angular service method
  agregarSucursal(datosGym: gimnasio):Observable<any>{
    return this.clienteHttp.post(this.API+"?insertar=1", datosGym);
  }

  actualizarPlan(id:any,datosPlan:any):Observable<any>{
    return this.clienteHttp.post(this.API+"?actualizar="+id,datosPlan);
  } 

  consultarPlan(id:any):Observable<any>{
    return this.clienteHttp.get(this.API+"?consultar="+id);
  }

  borrarSucursal(id:any):Observable<any>{
    console.log("si entro aca") 
    return this.clienteHttp.get(this.API+"?borrar="+id)
    //this.message = "¡Error al eliminar!, Restricción en la base de datos";
  }

}
