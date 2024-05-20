import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { catchError, empty, map, Observable, Subject, switchMap, take } from 'rxjs';
import { AlertModalService } from 'src/app/shared/modals/service/alert-modal.service';
import { CrudService } from 'src/app/shared/service/crud.service';

import { Cliente } from '../../model/cliente.model';
import { ClientesFormComponent } from '../clientes-form/clientes-form.component';

@Component({
  selector: 'app-clientes-lista',
  templateUrl: './clientes-lista.component.html',
  styleUrls: ['./clientes-lista.component.css'],
  preserveWhitespaces: true
})
export class ClientesListaComponent implements OnInit {

  bsModalRef!: BsModalRef;
  deleteModalRef?: BsModalRef;
  searchTerm: string = '';


  @ViewChild('deleteModal') deleteModal: any;

  clientes$!: Observable<Cliente[]>;
  error$ = new Subject<boolean>();

  clienteSelecionado!: Cliente;

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
    const endpoint = '/api/clientes';
    this.clientes$ = this.crudService.list<Cliente>(endpoint).pipe(
      catchError(error => {
        console.log(error);
        this.handleError();
        return empty();
      })
    );
  }

  handleError() {
    this.alertModalService.showAlertDanger('Erro ao carregar usuários. Tente novamente mais tarde.');
  }

  onDelete(cliente: Cliente) {
    this.clienteSelecionado = cliente;
    const result$ = this.alertModalService.showConfirm('Confirmacao', 'Tem certeza que deseja remover o usuário?');
    result$.pipe(
      take(1),
      switchMap(result => (result ? this.crudService.remove('/api/clientes', String(cliente.id)) : empty()))
    ).subscribe(
      success => {
        this.onRefresh();
        this.deleteModalRef?.hide();
        this.crudService.triggerRefresh();
      },
    );
  }

  onConfirmDelete() {
    this.crudService.remove('api/clientes', String(this.clienteSelecionado.id)).subscribe(
      success => {
        this.onRefresh();
        this.deleteModalRef?.hide();
      },
      error => {
        this.alertModalService.showAlertDanger('Erro ao remover usuário. Tente novamente mais tarde.');
        this.deleteModalRef?.hide();
      }
    );
  }

  onDeclineDelete() {
    this.deleteModalRef?.hide();
  }

  editarModal(cliente: Cliente) {
    const initialState = {
      cliente: cliente
    };
    this.bsModalRef = this.modalService.show(ClientesFormComponent, { initialState });
  }

  novoModal() {
    this.bsModalRef = this.modalService.show(ClientesFormComponent);
    this.bsModalRef.onHide?.subscribe((result: any) => {
      if (result) {
        this.onRefresh();
      }
    });
  }

  search(e: Event){
    const target = e.target as HTMLInputElement;
    const value = target.value.toLowerCase();
  
    this.clientes$ = this.crudService.list<Cliente>('/api/clientes').pipe(
      catchError(error => {
        console.log(error);
        this.handleError();
        return empty();
      }),
      map(clientes => clientes.filter(cliente => 
        cliente.nome.toLowerCase().includes(value) ||
        cliente.email.toString().includes(value) ||
        cliente.telefone.toString().includes(value)
      ))
    );
  }
}
