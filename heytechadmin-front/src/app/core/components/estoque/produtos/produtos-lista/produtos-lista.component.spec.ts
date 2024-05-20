import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosListaComponent } from './produtos-lista.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { CrudService } from 'src/app/shared/service/crud.service';

describe('ProdutosListaComponent', () => {
  let component: ProdutosListaComponent;
  let fixture: ComponentFixture<ProdutosListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutosListaComponent],
      imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        ModalModule.forRoot()
      ],
      providers: [BsModalService, CrudService]
    });
    fixture = TestBed.createComponent(ProdutosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
