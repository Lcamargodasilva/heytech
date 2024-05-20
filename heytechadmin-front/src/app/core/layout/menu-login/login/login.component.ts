import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/core/service/auth.service';

import { CadastroComponent } from '../cadastro/cadastro.component';
import { RecuperarSenhaComponent } from '../recuperar-senha/recuperar-senha.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  senhaVisivel = false;
  lembrarSenha = false;

  login: any = {
    nome: null,
    senha: null
  }

  constructor(private authService: AuthService, private modalService: BsModalService, public bsModalRef: BsModalRef) {
  }

  onSubmit(form: NgForm) {}

  fazerLogin() {
    this.authService.fazerLogin(this.login);
  }

  openModal() {
    const config = {
      ignoreBackdropClick: true,
    };
    this.bsModalRef = this.modalService.show(CadastroComponent, config);
  }

  openSenha() {
    const config = {
      ignoreBackdropClick: true,
    };
    this.bsModalRef = this.modalService.show(RecuperarSenhaComponent, config);
  }

  toggleSenhaVisibility() {
    this.senhaVisivel = !this.senhaVisivel;
  }
}
