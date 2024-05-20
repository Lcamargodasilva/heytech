import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VendasListaComponent } from './vendas/vendas-lista/vendas-lista.component';

const routes: Routes = [
  { path: 'vendas', component: VendasListaComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FaturamentoRoutingModule { }
