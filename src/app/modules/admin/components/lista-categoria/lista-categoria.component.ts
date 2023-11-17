import { Component } from '@angular/core';
import { CategoriaService } from 'src/app/service/categoria.service';

@Component({
  selector: 'app-lista-categoria',
  templateUrl: './lista-categoria.component.html',
  styleUrls: ['./lista-categoria.component.css']
})
export class ListaCategoriaComponent {

  public categorias: any;
  public page: number = 0;
  public search: string = '';
  constructor(private categoriaService: CategoriaService){}

  ngOnInit():void{
    this.categoriaService.obternerCategoria().subscribe({
      next: (resultData) => {
        console.log(resultData);
        this.categorias = resultData;
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
    this.search = search.toLowerCase();
  }
}



 


