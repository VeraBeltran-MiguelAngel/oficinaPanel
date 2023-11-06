import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { MembresiasComponent } from './components/membresias/membresias.component';
import { ColaboradoresComponent } from './components/colaboradores/colaboradores.component';
import { MembresiasListaComponent } from './components/membresias-lista/membresias-lista.component';
import { MembresiasEditarComponent } from './components/membresias-editar/membresias-editar.component';
import { EditarColaboradorComponent } from './components/editar-colaborador/editar-colaborador.component';
import { AltaColaboradoresComponent } from './components/alta-colaboradores/alta-colaboradores.component';
import { SucursalListaComponent } from './components/sucursal-lista/sucursal-lista.component';
import { SucursalAltaComponent } from './components/sucursal-alta/sucursal-alta.component';
import { SucursalEditarComponent } from './components/sucursal-editar/sucursal-editar.component';
import { HorariosComponent } from './components/horarios/horarios.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDashboardComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'membresias', component: MembresiasComponent },
      { path: 'colaboradores', component: ColaboradoresComponent },
      { path: 'listaMembresias', component: MembresiasListaComponent},
      { path: 'editarMembresias/:id', component: MembresiasEditarComponent},
      { path: 'editar-colaborador/:id', component: EditarColaboradorComponent},
      { path: 'alta-colaborador', component: AltaColaboradoresComponent},
      { path: 'lista-sucursales', component: SucursalListaComponent},
      { path: 'alta-sucursal', component: SucursalAltaComponent},
      { path: 'editar-sucursal/:id', component: SucursalEditarComponent},
      { path: 'horario/:id', component:HorariosComponent},
      { path: '', redirectTo: '/admin/home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
