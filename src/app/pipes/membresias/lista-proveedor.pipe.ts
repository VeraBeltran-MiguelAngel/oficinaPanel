import { Pipe, PipeTransform } from '@angular/core';
import { plan } from 'src/app/service/plan';

@Pipe({
  name: 'listarMembresia'
})
export class ListarMembresiaPipe implements PipeTransform {

  transform(membresias: plan[] | undefined, page: number = 0, search: string = ''): plan[] {
    if (!membresias) {
      return [];
    }
  

    if (search.length === 0) {
      return membresias.slice(page, page + 5);
    }

  
  const filteredPokemons = membresias.filter( plan => plan.titulo.toLowerCase().includes( search.toLowerCase()) );
  return filteredPokemons.slice(page, page + 5);
  }

}
