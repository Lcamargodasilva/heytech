import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProdutosListaComponent } from './produtos/produtos-lista/produtos-lista.component';

const routes: Routes = [
  { path: '', component: ProdutosListaComponent},
  //{ path: 'novo', component: ProdutosFormComponent},
  //{ path: 'editar/:id', component: ProdutosFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstoqueRoutingModule { }
