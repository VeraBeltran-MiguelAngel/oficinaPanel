import { Pipe, PipeTransform } from '@angular/core';
import { listaEmpleados } from 'src/app/models/empleado';

@Pipe({
  name: 'listarEmpleados'
})
export class ListarEmpleadosPipe implements PipeTransform {

  transform(empleados: listaEmpleados[],page: number = 0, search: string = ''): listaEmpleados[] {

    if ( search.length === 0 )
    return empleados.slice(page, page + 5);
  
  const filteredPokemons = empleados.filter( empleado => empleado.nombre.toLowerCase().includes( search ) );
  return filteredPokemons.slice(page, page + 5);
  }

}
