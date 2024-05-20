import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { ClientesFormComponent } from './clientes/clientes-form/clientes-form.component';
import { ClientesListaComponent } from './clientes/clientes-lista/clientes-lista.component';
import { PessoalRoutingModule } from './pessoal-routing.module';
import { CelularPipe } from './pipes/celular.pipe';
import { UsuariosFormComponent } from './usuarios/usuarios-form/usuarios-form.component';
import { UsuariosListaComponent } from './usuarios/usuarios-lista/usuarios-lista.component';


@NgModule({
  declarations: [
    UsuariosFormComponent,
    UsuariosListaComponent,
    ClientesListaComponent,
    ClientesFormComponent,
    CelularPipe,
  ],
  imports: [
    CommonModule,
    PessoalRoutingModule,
    ReactiveFormsModule
  ]
})
export class PessoalModule { }
