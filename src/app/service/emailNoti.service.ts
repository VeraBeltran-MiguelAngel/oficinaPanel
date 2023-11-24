import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class notificaciones {
  // API: string = 'http://localhost/EnviarMail/nuevaContra.php/';
  API: string ='http://localhost/pruebamail/EnviarMail/enviarNtificacion.php';
  APITra: string ='http://localhost/pruebamail/EnviarMail/enviarNotificacionTrabajador.php';
  //para guardar los headers que manda el API
  httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private clienteHttp: HttpClient) {}

  /**
   * Metodo para enviar mail con link de reset password
   * @param email
   * @returns
   */
  enviarMail(nombre: string, texto: string, archivo: File): Observable<any> {
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('texto', texto);
    formData.append('archivo', archivo);
    return this.clienteHttp.post(this.API + '?enviar', formData);
  }

  enviarMailTrabajadores(nombre: string, texto: string, archivo: File): Observable<any> {
    const formData = new FormData();
    formData.append('nombre', nombre);
    formData.append('texto', texto);
    formData.append('archivo', archivo);
    return this.clienteHttp.post(this.APITra + '?enviarTrabajadores', formData);
  }
}