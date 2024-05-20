package app.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.entity.Produto;
import app.repository.ProdutoRepository;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;
    
    public void atualizarEstoque(Long produtoId, int quantidadeVendida) {
        Optional<Produto> optionalProduto = produtoRepository.findById(produtoId);
        if (optionalProduto.isPresent()) {
            Produto produto = optionalProduto.get();
            int novoEstoque = produto.getQtidadeEstoque() - quantidadeVendida;
            produto.setQtidadeEstoque(novoEstoque);
            produtoRepository.save(produto);
        } else {
            throw new RuntimeException("Produto não encontrado!");
        }
    }
    
    public boolean existsByCodigo(String codigo) {
        return produtoRepository.existsByCodigo(codigo);
    }
        public Optional<Produto> encontrarProdutoPorNome(String nome) {
        return produtoRepository.findByNome(nome);
    }

    public Optional<Produto> encontrarProdutoPorCodigo(String codigo) {
        return produtoRepository.findByCodigo(codigo);
    }

    public Produto salvarProduto(Produto produto) {
        return produtoRepository.save(produto);
    }

    public Optional<Produto> encontrarProdutoPorId(Long id) {
        return produtoRepository.findById(id);
    }

    public void deletarProdutoPorId(Long id) {
        produtoRepository.deleteById(id);
    }
}
