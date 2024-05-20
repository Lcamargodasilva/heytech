import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { EstoqueRoutingModule } from './estoque-routing.module';
import { ProdutosFormComponent } from './produtos/produtos-form/produtos-form.component';
import { ProdutosListaComponent } from './produtos/produtos-lista/produtos-lista.component';

@NgModule({
  declarations: [
    ProdutosListaComponent,
    ProdutosFormComponent,
  ],
  imports: [
    CommonModule,
    EstoqueRoutingModule,
    ReactiveFormsModule,
  ]
})
export class EstoqueModule { }
