import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { plan } from './plan';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  API: string = 'https://olympus.arvispace.com/conPrincipal/Membresia.php'
  constructor(private clienteHttp:HttpClient) {
  }

  agregarPlan(datosPlan:plan):Observable<any>{
    return this.clienteHttp.post(this.API+"?insertar=1",datosPlan);
  }

  obternerPlan(){
    return this.clienteHttp.get(this.API)
  }

  consultarPlan(id:any):Observable<any>{
    return this.clienteHttp.get(this.API+"?consultar="+id);
  }

  borrarPlan(id:any):Observable<any>{
    return this.clienteHttp.get(this.API+"?borrar="+id)
  }

  actualizarPlan(id:any,datosPlan:any):Observable<any>{
    return this.clienteHttp.post(this.API+"?actualizar="+id,datosPlan);
  }  


}
