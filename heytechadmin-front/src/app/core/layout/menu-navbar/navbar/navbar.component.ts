import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { PerfilComponent } from '../perfil/perfil.component';
import { SuporteComponent } from '../suporte/suporte.component';
import { AuthService } from '../../../service/auth.service';
import { NotificacoesComponent } from '../notificacoes/notificacoes.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  preserveWhitespaces: true
})
export class NavbarComponent implements OnInit {
  modalRef!: BsModalRef;
  mostrarMenu: boolean = false;

  constructor(private authService: AuthService, private modalService: BsModalService, public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.authService.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarMenu = mostrar
    );
  }

  openModal(template: TemplateRef<any>) {
    const config = {
      ignoreBackdropClick: true,
    };
    this.modalRef = this.modalService.show(template, config);
  }

  openNotification() {
    const config = {
      ignoreBackdropClick: true,
    };
    this.modalRef = this.modalService.show(NotificacoesComponent, config);
  }

  openPerfil() {
    const config = {
      ignoreBackdropClick: true,
    };
    this.modalRef = this.modalService.show(PerfilComponent, config);
  }

  openSuporteModal() {
    const config = {
      ignoreBackdropClick: true,
    };
    this.modalRef = this.modalService.show(SuporteComponent, config);
  }

}
