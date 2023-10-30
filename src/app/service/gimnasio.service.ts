import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GimnasioService {

  API: string = 'http://localhost/plan/gimnasio.php'
  constructor(private clienteHttp:HttpClient) {
  }

  obternerPlan(){
    return this.clienteHttp.get(this.API)
  }
}
