package app.entity;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "tb_venda_produto")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VendaProduto {
	
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    
    @ManyToOne
    @JsonIgnoreProperties("produtos")
    private Venda venda;
    
    @ManyToOne
    private Produto produto;
    
    private int qtidadeVendida;
    
    private double valorVendido;
    
    private double descontoGlobal;
    
    private Date dataVenda = new Date();
    
}
