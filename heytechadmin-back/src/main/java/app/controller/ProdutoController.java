package app.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import app.entity.Produto;
import app.repository.ProdutoRepository;
import app.service.ProdutoService;

@RestController
@RequestMapping("/api/produtos")
@CrossOrigin("*")
public class ProdutoController {
	
	@Autowired
	private ProdutoRepository produtoRepository;
	
	@Autowired
	private ProdutoService produtoService;
	
    @GetMapping("/listar")
    public List<Produto> listarProdutos(){
        return produtoRepository.findAll();
    }
	
    @GetMapping
    public List<Produto> listarProdutos(@RequestParam(required = false) String termo, @RequestParam(required = false) String tipo){
        if (termo != null && !termo.isEmpty()) {
            if ("codigo".equals(tipo)) {
                return produtoRepository.findByCodigoContaining(termo);
            } else {
                return produtoRepository.findByNomeContainingIgnoreCase(termo);
            }
        } else {
            return produtoRepository.findAll();
        }
    }

	@PostMapping
	public ResponseEntity<?> criarProduto(@RequestBody Produto produto){
		if(produtoRepository.existsByCodigo(produto.getCodigo())) {
			return ResponseEntity.badRequest().body("Já existe um produto com esse código de barras");
		} else {
			Produto novoProduto = produtoRepository.save(produto);
			return ResponseEntity.ok(novoProduto);
		}
	}
	
	 @PutMapping("/{id}")
	    public ResponseEntity<Produto> atualizarProduto(@PathVariable Long id, @RequestBody Produto produtoAtualizado) {
	        Optional<Produto> produtoExistente = produtoRepository.findById(id);

	        if (produtoExistente.isPresent()) {
	            produtoAtualizado.setId(id);
	            Produto produtoAtualizadoSalvo = produtoRepository.save(produtoAtualizado);
	            return ResponseEntity.ok(produtoAtualizadoSalvo);
	        } else {
	            return ResponseEntity.notFound().build();
	        }
	    }

	    @DeleteMapping("/{id}")
	    public void deletarProduto(@PathVariable String id) {
	        Long productId = Long.parseLong(id);
	        produtoRepository.deleteById(productId);
	    }

		public ProdutoRepository getProdutoRepository() {
			return produtoRepository;
		}

		public void setProdutoRepository(ProdutoRepository produtoRepository) {
			this.produtoRepository = produtoRepository;
		}

		public ProdutoService getProdutoService() {
			return produtoService;
		}

		public void setProdutoService(ProdutoService produtoService) {
			this.produtoService = produtoService;
		}
}
