package app.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import app.entity.Cliente;
import app.entity.Produto;
import app.repository.ClienteRepository;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin("*")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;

    @GetMapping("/listar")
    public List<Cliente> listarClientes() {
        return clienteRepository.findAll();
    }
    
    @GetMapping
    public List<Cliente> listarClientes(@RequestParam(required = false) String termo, @RequestParam(required = false) String tipo){
        if (termo != null && !termo.isEmpty()) {
            if ("nome".equals(tipo)) {
                return clienteRepository.findByEmailContaining(termo);
            } else {
                return clienteRepository.findByNomeContainingIgnoreCase(termo);
            }
        } else {
            return clienteRepository.findAll();
        }
    }

    @PostMapping
    public ResponseEntity<?> criarCliente(@RequestBody Cliente cliente) {
            Cliente novoCliente = clienteRepository.save(cliente);
            return ResponseEntity.ok(novoCliente);
        }

    @PutMapping("/{id}")
    public ResponseEntity<Cliente> atualizarCliente(@PathVariable Long id, @RequestBody Cliente clienteAtualizado) {
        Optional<Cliente> clienteExistente = clienteRepository.findById(id);

        if (clienteExistente.isPresent()) {
        	clienteAtualizado.setId(id);
            Cliente clienteAtualizadoSalvo = clienteRepository.save(clienteAtualizado);
            return ResponseEntity.ok(clienteAtualizadoSalvo);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public void deletarCliente(@PathVariable Long id) {
    	clienteRepository.deleteById(id);
    }
}
