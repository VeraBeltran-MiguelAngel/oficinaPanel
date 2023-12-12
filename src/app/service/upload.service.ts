import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  SERVER_URL: string = 'https://file.io/';
  constructor(private httpClient: HttpClient) {}

  public upload(formData: any) {
    return this.httpClient.post<any>(this.SERVER_URL, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
