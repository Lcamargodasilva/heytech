import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-alert-modal',
  template: '',
  styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {

  @Input() type: 'success' | 'error' | 'warning' | 'info' = 'success';
  @Input() message: string = '';

  constructor() {}

  ngOnInit() {
    this.showAlert();
  }

  showAlert() {
    Swal.fire({
      icon: this.type,
      title: this.getTitle(),
      text: this.message,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: 'Ok'
    });
  }

  getTitle(): string {
    switch (this.type) {
      case 'success':
        return 'Success!';
      case 'error':
        return 'Error!';
      case 'warning':
        return 'Warning!';
      case 'info':
        return 'Info!';
      default:
        return '';
    }
  }
}
