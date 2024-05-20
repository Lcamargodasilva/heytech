import { TestBed } from '@angular/core/testing';

import { ProdutoService } from './produto.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProdutoService', () => {
  let service: ProdutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [ProdutoService]
    });
    service = TestBed.inject(ProdutoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
