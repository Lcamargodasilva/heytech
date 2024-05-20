package app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import app.entity.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long>{
	
    boolean existsByCodigo(String codigo);

    Optional<Produto> findByCodigo(String codigo);

    Optional<Produto> findByNome(String nome);

	List<Produto> findByNomeContainingIgnoreCase(String termo);
	
	List<Produto> findByCodigoContaining(String codigo);

}
