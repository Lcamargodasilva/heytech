import { Component, Input, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalService } from 'src/app/shared/modals/service/alert-modal.service';
import Swal from 'sweetalert2';

import { Produto } from '../../../estoque/model/produto.model';
import { ProdutoService } from '../../../estoque/services/produto.service';
import { Cliente } from '../../../pessoal/model/cliente.model';
import { ClientesService } from '../../../pessoal/services/clientes.service';
import { Venda } from '../../model/venda';
import { VendaProduto } from '../../model/vendaproduto';
import { VendasService } from '../../services/vendas.service';

@Component({
  selector: 'app-vendas-form',
  templateUrl: './vendas-form.component.html',
  styleUrls: ['./vendas-form.component.css'],
  preserveWhitespaces: true
})
export class VendasFormComponent implements OnInit {

  @Input() venda: Venda | null = null;

  editarVenda = false;
  submitted = false;
  modalRef!: NgbModalRef;
  produtos: Produto[] = [];
  termoPesquisa: string = '';
  produtosSelecionados: VendaProduto[] = [];
  clientes: Cliente[] = [];
  qtidadeLancada!: number;
  form: any = {};

  constructor(
    public bsModalRef: BsModalRef,
    private modalService: NgbModal,
    private modal: AlertModalService,
    private produtoService: ProdutoService,
    private vendasService: VendasService,
    private clientesService: ClientesService
  ) { }

  ngOnInit() { }

  onSubmit() {
    this.submitted = true;

    const camposPreenchidos = this.form.clienteId && this.form.preco && this.produtosSelecionados.length > 0;
    if (camposPreenchidos) {
      let msgSuccess = this.form.id ? 'Venda editada com sucesso.' : 'Venda criada com sucesso.';
      let msgError = this.form.id ? 'Erro ao editar venda, tente novamente!' : 'Erro ao criar venda, tente novamente!';

      const vendaId = this.form.id || (this.venda ? this.venda.id : null);

      const vendaData = {
        clienteId: this.form.clienteId,
        preco: this.form.preco,
        produtos: this.produtosSelecionados.map(item => ({
          produtoId: item.produto.id,
          quantidade: item.qtidadeVendida,
          valorVendido: item.valorVendido
        }))
      };

      this.vendasService.salvarVenda(vendaData, vendaId).subscribe(
        () => {
          this.modal.showAlertSuccess(msgSuccess);
          this.bsModalRef?.hide();
          console.log("Venda salva com sucesso.");
        },
        () => {
          this.modal.showAlertDanger(msgError);
          console.error("Erro ao salvar a venda.");
        }
      );
    }
  }


  cancelarFormulario() {
    this.bsModalRef.hide();
  }

  fecharModal() {
    this.bsModalRef.hide();
  }

  produtosModal(modal: any) {
    const modalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.qtidadeLancada = 0;
    this.modalRef = this.modalService.open(modal, modalOptions);
    this.pesquisarProdutos();
    this.termoPesquisa = '';
  }

  pesquisarProdutos() {
    if (!this.termoPesquisa) {
      console.error("Erro: Termo de pesquisa vazio");
      return;
    }
    let tipoPesquisa: string;
    if (!isNaN(Number(this.termoPesquisa))) {
      tipoPesquisa = "codigo";
    } else {
      tipoPesquisa = "nome";
    }
    this.produtoService.pesquisarProduto(this.termoPesquisa, tipoPesquisa).subscribe(
      (produtos: Produto[]) => {
        this.produtos = produtos;
      }
    );
    console.log("Pesquisa " + this.termoPesquisa);
  }

  adicionarProduto(produto: Produto, qtidadeLancada: number) {
    if (!produto) {
      console.error("Erro: Produto inválido");
      return;
    }
    const produtoExistente = this.produtosSelecionados.find(p => p.produto.id === produto.id);
    if (produtoExistente) {
      this.modal.showAlertDanger('Erro: Este produto já foi adicionado à venda');

      return;
    }
    let vendaProduto = new VendaProduto();
    vendaProduto.produto = produto;
    vendaProduto.qtidadeVendida = qtidadeLancada;
    vendaProduto.valorVendido = produto.preco;
    this.produtosSelecionados.push(vendaProduto);
    this.termoPesquisa = '';
    this.modalRef.close();
  }

  fecharModalProdutos() {
    this.modalRef.close();
    this.termoPesquisa = '';
    this.produtos = [];
  }

  removerProduto(produto: Produto) {
    Swal.fire({
      title: 'Tem certeza?',
      text: 'Você realmente deseja remover este produto da venda?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const index = this.produtosSelecionados.findIndex(p => p.produto.id === produto.id);
        if (index !== -1) {
          this.produtosSelecionados.splice(index, 1);
        }
        Swal.fire(
          'Removido!',
          'O produto foi removido da venda.',
          'success'
        );
      }
    });
  }
  calcularValorTotalVenda(): number {
    let valorTotal = 0;
    const descontoGlobal = parseFloat(this.form.preco);

    for (const vendaProduto of this.produtosSelecionados) {
      valorTotal += vendaProduto.qtidadeVendida * vendaProduto.valorVendido;
    }

    if (descontoGlobal > 0) {
      const valorDesconto = (descontoGlobal / 100) * valorTotal;
      valorTotal -= valorDesconto;
    }

    return valorTotal;
  }


  clientePesquisa(modal: any) {
    const modalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      size: 'lg',
    };
    this.modalRef = this.modalService.open(modal, modalOptions);
    this.pesquisarClientes();
    this.termoPesquisa = '';
  }

  pesquisarClientes() {
    if (!this.termoPesquisa) {
      console.error("Erro: Termo de pesquisa vazio");
      return;
    }
    let tipoPesquisa: string;
    if (!isNaN(Number(this.termoPesquisa))) {
      tipoPesquisa = "nome";
    } else {
      tipoPesquisa = "email";
    }
    this.clientesService.pesquisarCliente(this.termoPesquisa, tipoPesquisa).subscribe(
      (clientes: Cliente[]) => {
        this.clientes = clientes;
      }
    );
    console.log("Pesquisa " + this.termoPesquisa);
  }

  selecionarCliente(cliente: Cliente) {
    this.form.clienteId = cliente.id;
    this.form.clienteNome = cliente.nome;
    this.modalRef.close();
  }

  fecharModalClientes() {
    this.modalRef.close();
    this.termoPesquisa = '';
    this.clientes = [];
  }
}
