package app.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.entity.Cliente;
import app.repository.ClienteRepository;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public Cliente salvarCliente(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public Optional<Cliente> encontrarClientePorNome(String nome) {
        return clienteRepository.findByNome(nome);
    }

    public Optional<Cliente> encontrarClientePorEmail(String email) {
        return clienteRepository.findByEmail(email);
    }

    public Optional<Cliente> encontrarClientePorId(Long id) {
        return clienteRepository.findById(id);
    }

    public void deletarClientePorId(Long id) {
    	clienteRepository.deleteById(id);
    }
}
