import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './core/layout/home/home.component';
import { CadastroComponent } from './core/layout/menu-login/cadastro/cadastro.component';
import { LoginComponent } from './core/layout/menu-login/login/login.component';
import { RecuperarSenhaComponent } from './core/layout/menu-login/recuperar-senha/recuperar-senha.component';
import { NotificacoesComponent } from './core/layout/menu-navbar/notificacoes/notificacoes.component';
import { PerfilComponent } from './core/layout/menu-navbar/perfil/perfil.component';
import { SuporteComponent } from './core/layout/menu-navbar/suporte/suporte.component';
import { PaginaNaoEncontradaComponent } from './core/layout/pagina-nao-encontrada/pagina-nao-encontrada.component';


const appRoutes: Routes = [
  { path: 'faturamento', loadChildren: () => import('./core/components/faturamento/faturamento.module').then(m => m.FaturamentoModule)},
  { path: 'pessoal', loadChildren: () => import('./core/components/pessoal/pessoal.module').then(m => m.PessoalModule)},
  { path: 'produtos', loadChildren: () => import('./core/components/estoque/estoque.module').then(m => m.EstoqueModule)},
  { path: 'recuperar-senha', component: RecuperarSenhaComponent },
  { path: 'cadastro', component: CadastroComponent },
  { path: 'perfil', component: PerfilComponent},
  { path: 'notificacoes', component: NotificacoesComponent},
  { path: 'suporte', component: SuporteComponent},
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: HomeComponent},
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: PaginaNaoEncontradaComponent },

];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})


export class AppRoutingModule { }
