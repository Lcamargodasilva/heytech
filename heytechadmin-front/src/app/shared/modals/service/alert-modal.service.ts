import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor() {}

  showAlertSuccess(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Sucesso',
      text: message,
      showCloseButton: true,
      confirmButtonText: 'Ok'
    });
  }

  showAlertDanger(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Erro',
      text: message,
      showCloseButton: true,
      confirmButtonText: 'Ok'
    });
  }

  showConfirm(title: string, message: string): Observable<boolean> {
    return new Observable<boolean>(observer => {
      Swal.fire({
        title: title,
        text: message,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim',
        cancelButtonText: 'Não'
      }).then(result => {
        observer.next(result.isConfirmed);
        observer.complete();
      });
    });
  }
}
