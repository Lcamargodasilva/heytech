import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { map } from 'rxjs';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null,
    endereco: {},
    foto: null
  };

  constructor(private http: HttpClient, public bsModalRef: BsModalRef) { }

  cepError: string = '';

  ngOnInit() { }

  onSubmit(form: NgForm) {
    console.log(form);
    console.log(this.usuario);

    this.http.post('enderecoServe/FormUsuario', JSON.stringify(form.value))
      .subscribe((dados: any) => {
        console.log(dados);
      });
  }

  consultaCEP(cep: any, form: NgForm) {
    this.resetaDadosForm(form);

    if (!cep) {
      return;
    }

    cep = cep.replace(/\D/g, '');

    if (cep != null && cep !== '') {
      let validacep = /^[0-9]{8}$/;

      if (validacep.test(cep)) {
        this.http.get(`//viacep.com.br/ws/${cep}/json/`)
          .pipe(map((dados: any) => dados))
          .subscribe(
            (dados: any) => {
              this.populaDadosForm(dados, form);

              if (this.usuario && this.usuario.endereco) {
                this.usuario.endereco.cep = '';
              }
            },
            (error) => {
              console.error(error);
              this.exibeErroCEP();
            }
          );
      } else {
        this.exibeErroCEPInvalido();
      }
    }
  }

  exibeErroCEP() {
  this.usuario.endereco.cep = '';
  this.cepError = 'CEP não encontrado.';
}

exibeErroCEPInvalido() {
  this.usuario.endereco.cep = '';
  this.cepError = 'Formato de CEP inválido.';
}

  populaDadosForm(dados: any, form: NgForm) {
    form.form.patchValue({
      endereco: {
        rua: dados.logradouro,
        cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
      },
    });
  }

  resetaDadosForm(form: NgForm) {
    form.form.patchValue({
      endereco: {
        rua: null,
        complemento: null,
        bairro: null,
        cidade: null,
        estado: null,
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.usuario.foto = file;
    }
  }

}
