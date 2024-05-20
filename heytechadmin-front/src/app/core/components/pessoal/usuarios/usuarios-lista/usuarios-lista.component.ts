import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { catchError, empty, map, Observable, Subject, switchMap, take } from 'rxjs';
import { AlertModalService } from 'src/app/shared/modals/service/alert-modal.service';
import { CrudService } from 'src/app/shared/service/crud.service';

import { Usuario } from '../../model/usuario.model';
import { UsuariosFormComponent } from '../usuarios-form/usuarios-form.component';

@Component({
  selector: 'app-usuarios-lista',
  templateUrl: './usuarios-lista.component.html',
  styleUrls: ['./usuarios-lista.component.css'],
  preserveWhitespaces: true
})
export class UsuariosListaComponent implements OnInit {

  bsModalRef!: BsModalRef;
  deleteModalRef?: BsModalRef;
  searchTerm: string = '';

  @ViewChild('deleteModal') deleteModal: any;

  usuarios$!: Observable<Usuario[]>;
  error$ = new Subject<boolean>();

  usuarioSelecionado!: Usuario;

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
    const endpoint = '/api/usuarios';
    this.usuarios$ = this.crudService.list<Usuario>(endpoint).pipe(
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

  onDelete(usuario: Usuario) {
    this.usuarioSelecionado = usuario;
    const result$ = this.alertModalService.showConfirm('Confirmacao', 'Tem certeza que deseja remover o usuário?');
    result$.pipe(
      take(1),
      switchMap(result => (result ? this.crudService.remove('/api/usuarios', String(usuario.id)) : empty()))
    ).subscribe(
      success => {
        this.onRefresh();
        this.deleteModalRef?.hide();
        this.crudService.triggerRefresh();
      },
    );
  }

  onConfirmDelete() {
    this.crudService.remove('api/usuarios', String(this.usuarioSelecionado.id)).subscribe(
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

  editarModal(usuario: Usuario) {
    const initialState = {
      usuario: usuario
    };
    this.bsModalRef = this.modalService.show(UsuariosFormComponent, { initialState });
  }

  novoModal() {
    this.bsModalRef = this.modalService.show(UsuariosFormComponent);
    this.bsModalRef.onHide?.subscribe((result: any) => {
      if (result) {
        this.onRefresh();
      }
    });
  }

  
  search(e: Event){
    const target = e.target as HTMLInputElement;
    const value = target.value.toLowerCase();
  
    this.usuarios$ = this.crudService.list<Usuario>('/api/usuarios').pipe(
      catchError(error => {
        console.log(error);
        this.handleError();
        return empty();
      }),
      map(usuarios => usuarios.filter(usuario => 
        usuario.usuario.toLowerCase().includes(value) ||
        usuario.email.toString().includes(value) ||
        usuario.nome.toLowerCase().includes(value)
      ))
    );
  }
}
