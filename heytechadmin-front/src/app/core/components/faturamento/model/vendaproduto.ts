import { Produto } from '../../estoque/model/produto.model';
import { Venda } from './venda';

export class VendaProduto {
  id!: number;
  venda!: Venda;
  produto!: Produto;
  qtidadeVendida!: number;
  valorVendido!: number;
  descontoGlobal!: number;  
}
