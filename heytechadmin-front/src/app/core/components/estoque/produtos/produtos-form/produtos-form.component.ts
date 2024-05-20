import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalService } from 'src/app/shared/modals/service/alert-modal.service';
import { CrudService } from 'src/app/shared/service/crud.service';
import { Produto } from '../../model/produto.model';

@Component({
  selector: 'app-produtos-form',
  templateUrl: './produtos-form.component.html',
  styleUrls: ['./produtos-form.component.css'],
  preserveWhitespaces: true
})
export class ProdutosFormComponent implements OnInit {

  @Input() produto: Produto | null = null;

  editarProduto = false;
  form!: FormGroup;
  submitted = false;
  endpoint = 'api/produtos';

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    private crudService: CrudService,
    private modal: AlertModalService
  ) { }

  ngOnInit() {
    this.inicializarFormulario(this.produto);
  }

  inicializarFormulario(produto: Produto | null) {
    if (produto) {
      this.editarProduto = true;
      this.form = this.fb.group({
        id: [produto.id],
        nome: [produto.nome, [Validators.required, Validators.minLength(3)]],
        preco: [produto.preco, [Validators.required, Validators.min(1), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
        codigo: [produto.codigo, [Validators.required, Validators.pattern(/^\d+$/)]],
        qtidadeEstoque: [produto.qtidadeEstoque, [Validators.required, Validators.min(1)]]
      });
    } else {
      this.form = this.fb.group({
        id: [null],
        nome: ['', [Validators.required, Validators.minLength(3)]],
        preco: ['', [Validators.required, Validators.min(1), Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
        codigo: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
        qtidadeEstoque: ['', [Validators.required, Validators.min(1), Validators.pattern(/^\d+$/)]]
      });
    }
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.valid) {
      let msgSuccess = 'Produto criado com sucesso.';
      let msgError = 'Erro ao criar produto, tente novamente!';

      const productId = this.form.value.id || (this.produto ? this.produto.id : null); // Obter o ID do produto

      if (productId) {
        msgSuccess = 'Produto editado com sucesso.';
        msgError = 'Erro ao editar produto, tente novamente!';
      }

      this.crudService.save(this.endpoint, productId, this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess(msgSuccess);
          this.crudService.triggerRefresh();
          this.bsModalRef.hide();
        },
        error => {
          if (error) {
            this.modal.showAlertDanger(msgError);
          }
        }
      );
    }
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
  }

  fecharModal() {
    this.bsModalRef.hide();
  }
}
