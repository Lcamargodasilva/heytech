import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalService } from 'src/app/shared/modals/service/alert-modal.service';
import { CrudService } from 'src/app/shared/service/crud.service';
import { Usuario } from '../../model/usuario.model';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.css'],
  preserveWhitespaces: true
})
export class UsuariosFormComponent implements OnInit {

  @Input() usuario: Usuario | null = null;

  editarUsuario = false;
  form!: FormGroup;
  submitted = false;
  endpoint = 'api/usuarios';

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private crudService: CrudService,
    private modal: AlertModalService,
  ) { }

  ngOnInit() {
    this.inicializarFormulario(this.usuario);
  }

  inicializarFormulario(usuario: Usuario | null) {
    this.editarUsuario = !!usuario;

    this.form = this.fb.group({
      id: [usuario?.id || null],
      nome: [usuario?.nome || '', [Validators.required]],
      usuario: [usuario?.usuario || '', [Validators.required]],
      email: [usuario?.email || '', [Validators.required, Validators.pattern('^[A-Za-z0-9._%+-]+@[A-Za-z0-9._%+-]{2,}[.][A-Za-z]{2,}$')]],
      role: [usuario?.role || '', []],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmacaoSenha: ['', [Validators.required]]
    }, { validator: this.confirmacaoSenhaValidator });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.valid) {
      const msg = this.editarUsuario ? 'Usuário editado com sucesso.' : 'Usuário criado com sucesso.';

      this.crudService.save(this.endpoint, this.form.value.id, this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess(msg);
          this.crudService.triggerRefresh();
          this.bsModalRef.hide();
        },
        error => {
          if (error) {
            const errorMsg = this.editarUsuario ? 'Erro ao editar usuário, tente novamente!' : 'Erro ao criar usuário, tente novamente!';
            this.modal.showAlertDanger(errorMsg);
          }
        }
      );
    }
  }

  confirmacaoSenhaValidator(group: FormGroup) {
    const senha = group.get('senha')?.value;
    const confirmacaoSenha = group.get('confirmacaoSenha')?.value;
    return senha === confirmacaoSenha ? null : { confirmacaoSenhaInvalida: true };
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }

  fecharModal() {
    this.bsModalRef.hide();
  }
}
