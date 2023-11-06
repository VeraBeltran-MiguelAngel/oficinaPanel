import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { franquicia } from './franquicia';


@Injectable({
  providedIn: 'root'
})
export class franquiciaService {
  API: string = 'http://localhost/plan/franquicia.php'
  constructor( private clienteHttp:HttpClient){}

  obternerFran(){
    return this.clienteHttp.get(this.API)
  }

  consultarPlan(id:any):Observable<any>{
    return this.clienteHttp.get(this.API+"?consultarF="+id);
  }

}
