import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
}
