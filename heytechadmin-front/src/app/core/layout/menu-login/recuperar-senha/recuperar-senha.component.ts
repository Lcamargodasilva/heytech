import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent implements OnInit {

  usuario: any = {
    email: null
  }

  onSubmit(form: NgForm) {}

  constructor(public bsModalRef: BsModalRef){}

  onClose() {
    this.bsModalRef.hide();
  }

  ngOnInit(){}

}
