import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from '../app-routing.module';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './layout/home/home.component';
import { IndexComponent } from './layout/index/index.component';
import { CadastroComponent } from './layout/menu-login/cadastro/cadastro.component';
import { LoginComponent } from './layout/menu-login/login/login.component';
import { RecuperarSenhaComponent } from './layout/menu-login/recuperar-senha/recuperar-senha.component';
import { NavbarComponent } from './layout/menu-navbar/navbar/navbar.component';
import { PerfilComponent } from './layout/menu-navbar/perfil/perfil.component';
import { SuporteComponent } from './layout/menu-navbar/suporte/suporte.component';
import { PaginaNaoEncontradaComponent } from './layout/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';

@NgModule({
  declarations: [
    IndexComponent,
    HomeComponent,
    LoginComponent,
    RecuperarSenhaComponent,
    CadastroComponent,
    PaginaNaoEncontradaComponent,
    FooterComponent,
    SuporteComponent,
    PerfilComponent,
    NavbarComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    IndexComponent
  ]
})
export class CoreModule { }
