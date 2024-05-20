import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { AlertModalService } from 'src/app/shared/modals/service/alert-modal.service';
import { Usuario } from '../components/pessoal/model/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  deleteModalRef?: BsModalRef;
  private usuarioAutenticado: boolean = false;

  mostrarMenuEmitter = new Subject<boolean>();

  constructor(private http: HttpClient,
    private router: Router,
    private alertModalService: AlertModalService
    ) { }

  fazerLogin(usuario: Usuario){

    this.http.post('/api/auth/login', usuario).subscribe(

      (response: any) => {
        this.usuarioAutenticado = true;
        this.mostrarMenuEmitter.next(true);
        this.router.navigate(['/']);
      },

      (error) => {
        this.usuarioAutenticado = false;
        this.mostrarMenuEmitter.next(false);
        this.alertModalService.showAlertDanger('Ocorreu um erro ao entrar. Por favor, entre em contato com o suporte técnico. Tente novamente mais tarde ou verifique se o usuário e a senha estão corretos.');
        this.deleteModalRef?.hide();
      }
    );
  }

  usuarioEstaAutenticado(){
    return this.usuarioAutenticado;
  }
}
