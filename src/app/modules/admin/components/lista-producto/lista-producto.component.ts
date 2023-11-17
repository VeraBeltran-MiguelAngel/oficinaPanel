import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/service/producto.service';


@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css']
})
export class ListaProductoComponent implements OnInit {
  public productos: any;
  public page: number = 0;
  public search: string = '';
  constructor(private productoService: ProductoService){}

  ngOnInit():void{
    this.productoService.obternerProducto().subscribe({
      next: (resultData) => {
        console.log(resultData);
        this.productos = resultData;
      }
    })
  }

  
getTamano(producto: any): string {
  return producto && producto.tamaño ? producto.tamaño : ''; // Verifica si la propiedad existe y la devuelve, o devuelve una cadena vacía si no existe
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
