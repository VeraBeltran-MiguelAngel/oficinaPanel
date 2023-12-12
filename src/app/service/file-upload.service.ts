import { Injectable } from "@angular/core";
import { HttpClient} from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FileUploadService {
  private baseUrl = "http://localhost/uploadFiles/subir.php";
  constructor(private http: HttpClient) {}

  subirImagenes(imagenes: File[]): Observable<any> {
    const formData: FormData = new FormData();
    // Recorre el array de imágenes y agrega cada una al FormData
    for (let i = 0; i < imagenes.length; i++) {
      formData.append("file", imagenes[i]);
    }

      // Imprime el contenido de formData en la consola
  console.log("Contenido de formData:", formData);

    return this.http.post(this.baseUrl + "?subirImagenes", formData);
  }

  getFiles(): Observable<any> {
    // return this.http.get(`${this.baseUrl}/files`);
    return this.http.get(this.baseUrl + "?verImagenes");
  }
}
