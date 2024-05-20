import { Produto } from "../../estoque/model/produto.model";
import { Cliente } from "../../pessoal/model/cliente.model";

export class Venda {
  id!: number;
  status!: string;
  cliente!: Cliente;
  produtos!: Produto[];

  constructor(id: number, status: string, cliente: Cliente, produtos: Produto[]) {
    this.id = id;
    this.status = status;
    this.cliente = cliente;
    this.produtos = produtos;
  }
}
