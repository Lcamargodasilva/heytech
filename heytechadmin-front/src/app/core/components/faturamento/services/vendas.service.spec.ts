import { TestBed } from '@angular/core/testing';

import { VendasService } from './vendas.service';
import { HttpClientModule } from '@angular/common/http';

describe('VendasService', () => {
  let service: VendasService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [VendasService]
    });
    service = TestBed.inject(VendasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
