import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProdutosListaComponent } from '../../../estoque/produtos/produtos-lista/produtos-lista.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';


describe('ProdutosListaComponent', () => {
  let component: ProdutosListaComponent;
  let fixture: ComponentFixture<ProdutosListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutosListaComponent],
      imports: [
        BrowserAnimationsModule,
        ModalModule.forRoot()
      ],
      providers: [BsModalService]
    });
    fixture = TestBed.createComponent(ProdutosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
