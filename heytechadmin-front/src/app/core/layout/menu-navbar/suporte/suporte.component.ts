import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-suporte',
  templateUrl: './suporte.component.html',
  styleUrls: ['./suporte.component.css'],
  preserveWhitespaces: true
})
export class SuporteComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null,
    endereco: {}
  };

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {}

}
