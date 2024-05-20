import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Venda } from '../model/venda';

@Injectable({
  providedIn: 'root'
})
export class VendasService {

  private baseUrl = '/api/vendas';

  constructor(private http: HttpClient) { }

  salvarVenda(vendaData: any, vendaId: any): Observable<Venda> {
    return this.http.post<Venda>(`${this.baseUrl}`, { clienteId: vendaData.clienteId, ...vendaData, id: vendaId });
  }
}
