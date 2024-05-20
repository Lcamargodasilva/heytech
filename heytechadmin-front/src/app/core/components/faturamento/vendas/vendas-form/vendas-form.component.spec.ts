import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendasFormComponent } from './vendas-form.component';
import { HttpClientModule } from '@angular/common/http';
import { ProdutoService } from '../../../estoque/services/produto.service';
import { FormsModule } from '@angular/forms';

describe('VendasFormComponent', () => {
  let component: VendasFormComponent;
  let fixture: ComponentFixture<VendasFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendasFormComponent],
      imports: [
        HttpClientModule,
        FormsModule
      ],
      providers: [ProdutoService]
    });
    fixture = TestBed.createComponent(VendasFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
