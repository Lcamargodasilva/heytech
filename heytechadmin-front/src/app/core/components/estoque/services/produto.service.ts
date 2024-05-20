import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Produto } from '../model/produto.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private baseUrl = '/api/produtos';

  constructor(private http: HttpClient) { }

  buscarProdutoPorNome(nome: string): Observable<Produto>{
    return this.http.get<Produto>(`${this.baseUrl}/nome/${nome}`);
  }

  buscarProdutoPorCodigo(codigo: string): Observable<Produto>{
    return this.http.get<Produto>(`${this.baseUrl}/codigo/${codigo}`);
  }

  pesquisarProduto(termo: string, tipo: string): Observable<Produto[]>{
    return this.http.get<Produto[]>(`${this.baseUrl}?termo=${termo}&tipo=${tipo}`);
  }

}
