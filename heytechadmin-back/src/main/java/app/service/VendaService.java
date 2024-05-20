package app.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.entity.Venda;
import app.entity.VendaProduto;
import app.repository.VendaRepository;

@Service
public class VendaService {

    @Autowired
    private VendaRepository vendaRepository;
    
    @Autowired
    private ProdutoService produtoService;
    
    
    public Venda salvarVenda(Venda venda) {

    	if(venda.getProdutos() != null)
    		for(int i=0; i<venda.getProdutos().size(); i++) {
    			venda.getProdutos().get(i).setVenda(venda);
    		}
    	
        Venda novaVenda = vendaRepository.save(venda);
        atualizarEstoque(venda);
        return novaVenda;
    }
    public void atualizarEstoque(Venda venda) {
    	List<VendaProduto> produtos = venda.getProdutos();
    	for (VendaProduto produto: produtos) {
    		produtoService.atualizarEstoque(produto.getProduto().getId(), produto.getQtidadeVendida() );
    	}
    }

    public Optional<Venda> encontrarVendaPorId(Long id) {
        return vendaRepository.findById(id);
    }

    public void deletarVendaPorId(Long id) {
    	vendaRepository.deleteById(id);
    }

	public List<Venda> listarVendas() {
		return vendaRepository.findAll();
	}
}