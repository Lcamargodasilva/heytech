import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from '../../model/cliente.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { CrudService } from 'src/app/shared/service/crud.service';
import { AlertModalService } from 'src/app/shared/modals/service/alert-modal.service';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css'],
  preserveWhitespaces: true
})
export class ClientesFormComponent implements OnInit {

  @Input() cliente: Cliente | null = null;

  editarCliente = false;
  form!: FormGroup;
  submitted = false;
  endpoint = 'api/clientes';

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private crudService: CrudService,
    private modal: AlertModalService,
  ) { }

  ngOnInit() {
    this.inicializarFormulario(this.cliente);
  }

  inicializarFormulario(cliente: Cliente | null) {
    this.editarCliente = !!cliente;

    this.form = this.fb.group({
      id: [cliente?.id || null],
      nome: [cliente?.nome || '', [Validators.required]],
      email: [cliente?.email || '', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9._%+-]{2,}[.][A-Za-z]{2,}$')]],
      telefone: [cliente?.telefone || '', [Validators.required, Validators.minLength(9)]],
    });
  }
  onSubmit() {
    this.submitted = true;

    if (this.form.valid) {
      const msg = this.editarCliente ? 'Usuário editado com sucesso.' : 'Usuário criado com sucesso.';

      this.crudService.save(this.endpoint, this.form.value.id, this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess(msg);
          this.crudService.triggerRefresh();
          this.bsModalRef.hide();
        },
        error => {
          if (error) {
            const errorMsg = this.editarCliente ? 'Erro ao editar usuário, tente novamente!' : 'Erro ao criar usuário, tente novamente!';
            this.modal.showAlertDanger(errorMsg);
          }
        }
      );
    }
  }


  onCancel() {
    this.submitted = false;
    this.form.reset();
  }

  fecharModal() {
    this.bsModalRef.hide();
  }
}
