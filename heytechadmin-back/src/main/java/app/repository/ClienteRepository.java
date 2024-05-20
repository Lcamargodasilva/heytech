package app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import app.entity.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {
	
    Optional<Cliente> findByNome(String nome);

    Optional<Cliente> findByEmail(String email);

	List<Cliente> findByNomeContainingIgnoreCase(String termo);
	
	List<Cliente> findByEmailContaining(String email);
}

