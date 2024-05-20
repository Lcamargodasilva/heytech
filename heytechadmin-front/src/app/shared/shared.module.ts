import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import { AlertModalComponent } from './modals/alert-modal/alert-modal.component';
import { DeleteModalComponent } from './modals/delete-modal/delete-modal.component';
import { FormularioCadastroComponent } from './formularios/formulario-cadastro/formulario-cadastro.component';



@NgModule({
  declarations: [
    AlertModalComponent,
    ConfirmModalComponent,
    DeleteModalComponent,
    FormularioCadastroComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [AlertModalComponent, ConfirmModalComponent],
})
export class SharedModule { }
