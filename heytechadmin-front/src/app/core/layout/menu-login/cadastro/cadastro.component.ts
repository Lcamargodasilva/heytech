import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import {  BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {

  usuario: any = {
    nome: null,
    email: null
  }

  onSubmit(form: NgForm) {}

  constructor(public bsModalRef: BsModalRef){}

  onClose() {
    this.bsModalRef.hide();
  }

}
