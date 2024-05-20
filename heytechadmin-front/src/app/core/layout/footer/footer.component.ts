import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  mostrarFooter: boolean = false;
  currentYear!: number;

  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();

    this.authService.mostrarMenuEmitter.subscribe(
      mostrar => this.mostrarFooter = mostrar
    );

  }
}
