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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.entity.Venda;
import app.service.VendaService;

@RestController
@RequestMapping("/api/vendas")
@CrossOrigin("*")
public class VendaController {
    
    @Autowired
    private VendaService vendaService;
    
    @PostMapping
    public ResponseEntity<Venda> criarVenda(@RequestBody Venda venda){
        Venda novaVenda = vendaService.salvarVenda(venda);
        return new ResponseEntity<>(novaVenda, HttpStatus.OK);
    }    
    
    @GetMapping("/{id}")
    public ResponseEntity<Venda> encontrarVendaPorId(@PathVariable Long id){
        Optional<Venda> venda = vendaService.encontrarVendaPorId(id);
        if(venda.isPresent()) {
            return new ResponseEntity<>(venda.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping
    public ResponseEntity<List<Venda>> listarVendas(){
        List<Venda> vendas = vendaService.listarVendas();
        return new ResponseEntity<>(vendas, HttpStatus.OK);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletarVendaPorId(@PathVariable Long id){
        vendaService.deletarVendaPorId(id);
        return ResponseEntity.noContent().build();
    }
}
