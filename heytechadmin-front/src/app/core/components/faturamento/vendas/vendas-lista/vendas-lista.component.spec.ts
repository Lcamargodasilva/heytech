import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendasListaComponent } from './vendas-lista.component';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

describe('VendasListaComponent', () => {
  let component: VendasListaComponent;
  let fixture: ComponentFixture<VendasListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendasListaComponent],
      imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        ModalModule.forRoot()
      ],
      providers: [BsModalService]
    });
    fixture = TestBed.createComponent(VendasListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
