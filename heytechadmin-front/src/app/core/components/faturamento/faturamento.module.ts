import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FaturamentoRoutingModule } from './faturamento-routing.module';
import { VendasFormComponent } from './vendas/vendas-form/vendas-form.component';
import { VendasListaComponent } from './vendas/vendas-lista/vendas-lista.component';

@NgModule({
  declarations: [
    VendasFormComponent,
    VendasListaComponent,
    VendasFormComponent
  ],
  imports: [
    CommonModule,
    FaturamentoRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class FaturamentoModule { }
