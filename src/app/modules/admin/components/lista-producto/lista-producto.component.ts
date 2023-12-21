import { Component, OnInit } from '@angular/core';
import { ProductoService } from 'src/app/service/producto.service';
import { CategoriaService } from 'src/app/service/categoria.service';


@Component({
  selector: 'app-lista-producto',
  templateUrl: './lista-producto.component.html',
  styleUrls: ['./lista-producto.component.css']
})
export class ListaProductoComponent implements OnInit {
  public productos: any;
  public page: number = 0;
  public search: string = '';
  constructor(private productoService: ProductoService, private categoriaService: CategoriaService){}

  ngOnInit():void{
    this.productoService.obternerProducto().subscribe({
      next: (resultData) => {
        console.log('productos',resultData);
        this.productos = resultData;
      }
    })
  }
  

  getCategoria(idCategoria: number) {
    this.categoriaService.consultarCategoria(idCategoria).subscribe((categoria) => {
      return categoria.nombre; // Retorna el nombre de la categoría
    });
  }  

  getCategoria1(idCategoria: string): number {
    return parseInt(idCategoria, 10); // Convertir el string a número
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
