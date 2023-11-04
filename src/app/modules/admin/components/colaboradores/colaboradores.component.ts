import { Component } from '@angular/core';
import { ColaboradorService } from 'src/app/service/colaborador.service';

@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.css']
})
export class ColaboradoresComponent {
  public empleados: any;
  public page: number = 0;
  public search: string = '';
  
  constructor(private http: ColaboradorService){}

  ngOnInit():void{
    this.http.listaColaboradores().subscribe({
      next: (resultData) => {
        console.log(resultData);
        this.empleados = resultData;
      }
    })
  }

  nextPage() {
    this.page += 5;
  }

  prevPage() {
    if ( this.page > 0 )
      this.page -= 5;
  }

  onSearchPokemon( search: string ) {
    this.page = 0;
    this.search = search;
  }

}
