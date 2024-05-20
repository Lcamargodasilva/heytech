import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { catchError, EMPTY, map, Observable, Subject, switchMap, take } from 'rxjs';
import { AlertModalService } from 'src/app/shared/modals/service/alert-modal.service';
import { CrudService } from 'src/app/shared/service/crud.service';

import { Produto } from '../../model/produto.model';
import { ProdutosFormComponent } from '../produtos-form/produtos-form.component';

@Component({
  selector: 'app-produtos-lista',
  templateUrl: './produtos-lista.component.html',
  styleUrls: ['./produtos-lista.component.css'],
  preserveWhitespaces: true
})
export class ProdutosListaComponent implements OnInit {

  bsModalRef!: BsModalRef;
  deleteModalRef?: BsModalRef;
  searchTerm: string = '';

  @ViewChild('deleteModal') deleteModal: any;

  produtos$!: Observable<Produto[]>;
  error$ = new Subject<boolean>();

  produtoSelecionado!: Produto;

  constructor(
    private modalService: BsModalService,
    private crudService: CrudService,
    private alertModalService: AlertModalService,
  ) { }

  ngOnInit() {
    this.onRefresh();
    this.crudService.refreshNeeded.subscribe(() => {
      this.onRefresh();
    });
  }

  onRefresh() {
    const endpoint = '/api/produtos';
    this.produtos$ = this.crudService.list<Produto>(endpoint).pipe(
      catchError(error => {
        console.log(error);
        this.handleError();
        return EMPTY;
      })
    );
  }

  handleError() {
    this.alertModalService.showAlertDanger('Erro ao carregar produtos. Tente novamente mais tarde.');
  }

  onDelete(produto: Produto) {
    this.produtoSelecionado = produto;
    const result$ = this.alertModalService.showConfirm('Confirmação', 'Tem certeza que deseja remover o produto?');
    result$.pipe(
      take(1),
      switchMap(result => (result ? this.crudService.remove('/api/produtos', String(produto.id)) : EMPTY))
    ).subscribe(
      success => {
        this.alertModalService.showAlertSuccess('Produto removido com sucesso.');
        this.onRefresh();
        this.crudService.triggerRefresh();
      },
      error => {
        this.alertModalService.showAlertDanger('Erro ao remover produto. Tente novamente mais tarde.');
      }
    );
  }

  editarModal(produto: Produto) {
    const initialState = {
      produto: produto
    };
    this.bsModalRef = this.modalService.show(ProdutosFormComponent, { initialState });
  }

  novoModal() {
    this.bsModalRef = this.modalService.show(ProdutosFormComponent);
  }

  search(e: Event) {
    const target = e.target as HTMLInputElement;
    const value = target.value.toLowerCase();

    this.produtos$ = this.crudService.list<Produto>('/api/produtos').pipe(
      catchError(error => {
        console.log(error);
        this.handleError();
        return EMPTY;
      }),
      map(produtos => produtos.filter(produto => 
        produto.nome.toLowerCase().includes(value) ||
        produto.codigo.toString().includes(value)
      ))
    );
  }
}
