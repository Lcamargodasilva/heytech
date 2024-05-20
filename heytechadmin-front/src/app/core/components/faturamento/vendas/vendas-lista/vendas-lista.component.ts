import { Component, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { catchError, empty, Observable, Subject, switchMap, take } from 'rxjs';
import { Venda } from '../../model/venda';
import { CrudService } from 'src/app/shared/service/crud.service';
import { AlertModalService } from 'src/app/shared/modals/service/alert-modal.service';
import { VendasFormComponent } from '../vendas-form/vendas-form.component';
import { Cliente } from '../../../pessoal/model/cliente.model';
import { Produto } from '../../../estoque/model/produto.model';

@Component({
  selector: 'app-vendas-lista',
  templateUrl: './vendas-lista.component.html',
  styleUrls: ['./vendas-lista.component.css'],
  preserveWhitespaces: true
})
export class VendasListaComponent {

  bsModalRef!: BsModalRef;
  deleteModalRef?: BsModalRef;
  @ViewChild('deleteModal') deleteModal: any;

  vendas$!: Observable<Venda[]>;
  error$ = new Subject<boolean>();
  cliente!: Cliente;
  produtos!: Produto[];
  vendaSelecionada!: Venda;

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
    const endpoint = '/api/vendas';
    this.vendas$ = this.crudService.list<Venda>(endpoint).pipe(
      catchError(error => {
        console.log(error);
        this.handleError();
        return empty();
      })
    );
  }

  handleError() {
    this.alertModalService.showAlertDanger('Erro ao carregar as vendas. Tente novamente mais tarde.');
  }

  onDelete(venda: Venda) {
    this.vendaSelecionada = venda;
    const result$ = this.alertModalService.showConfirm('Confirmacao', 'Tem certeza que deseja remover essa venda?');
    result$.pipe(
      take(1),
      switchMap(result => (result ? this.crudService.remove('/api/vendas', String(venda.id)) : empty()))
    ).subscribe(
      success => {
        this.onRefresh();
        this.deleteModalRef?.hide();
        this.crudService.triggerRefresh();
      },
    );
  }

  onConfirmDelete() {
    this.crudService.remove('api/vendas', String(this.vendaSelecionada.id)).subscribe(
      success => {
        this.onRefresh();
        this.deleteModalRef?.hide();
      },
      error => {
        this.alertModalService.showAlertDanger('Erro ao remover venda. Tente novamente mais tarde.');
        this.deleteModalRef?.hide();
      }
    );
  }

  onDeclineDelete() {
    this.deleteModalRef?.hide();
  }

  editarModal(venda: Venda) {
    const initialState = {
      venda: venda
    };
    this.bsModalRef = this.modalService.show(VendasFormComponent, { initialState, ignoreBackdropClick: true });
  }

  novoModal() {
    this.bsModalRef = this.modalService.show(VendasFormComponent, { ignoreBackdropClick: true });
    this.bsModalRef.onHide?.subscribe((result: any) => {
      if (result) {
        this.onRefresh();
      }
    });
  }
}
