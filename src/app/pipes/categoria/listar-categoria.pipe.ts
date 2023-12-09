import { Pipe, PipeTransform } from '@angular/core';
import { categoria } from 'src/app/models/categoria';

@Pipe({
  name: 'listarCategoria'
})
export class ListarCategoriaPipe implements PipeTransform {

  transform(categorias: categoria[] | undefined,page: number = 0, search: string = ''): categoria[] {
    if (!categorias) {
      return [];
    }

    if (search.length === 0) {
      return categorias.slice(page, page + 5);
    }

  
  const filteredPokemons = categorias.filter( categoria => categoria.nombre.toLowerCase().includes( search.toLowerCase()) );
  return filteredPokemons.slice(page, page + 5);
  }

}
