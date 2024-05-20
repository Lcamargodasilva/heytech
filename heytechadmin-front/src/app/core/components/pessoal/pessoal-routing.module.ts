import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UsuariosListaComponent } from './usuarios/usuarios-lista/usuarios-lista.component';
import { ClientesListaComponent } from './clientes/clientes-lista/clientes-lista.component';


const routes: Routes = [
  { path: 'usuarios', component: UsuariosListaComponent},
  { path: 'clientes', component: ClientesListaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoalRoutingModule { }
