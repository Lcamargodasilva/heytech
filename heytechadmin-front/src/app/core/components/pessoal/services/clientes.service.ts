import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../model/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private baseUrl = '/api/clientes';

  constructor(private http: HttpClient) { }

  buscarClientePorNome(nome: string): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.baseUrl}/nome/${nome}`);
  }

  buscarClientePorEmail(email: string): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.baseUrl}/email/${email}`);
  }

  pesquisarCliente(termo: string, tipo: string): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(`${this.baseUrl}?termo=${termo}&tipo=${tipo}`);
  }

}
