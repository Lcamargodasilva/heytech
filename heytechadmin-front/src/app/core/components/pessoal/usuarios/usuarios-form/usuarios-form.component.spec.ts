import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProdutosFormComponent } from '../../../estoque/produtos/produtos-form/produtos-form.component';


describe('ProdutosFormComponent', () => {
  let component: ProdutosFormComponent;
  let fixture: ComponentFixture<ProdutosFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutosFormComponent]
    });
    fixture = TestBed.createComponent(ProdutosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
