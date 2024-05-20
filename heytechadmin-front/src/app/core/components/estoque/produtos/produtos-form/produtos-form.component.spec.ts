import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosFormComponent } from './produtos-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CrudService } from 'src/app/shared/service/crud.service';

describe('ProdutosFormComponent', () => {
  let component: ProdutosFormComponent;
  let fixture: ComponentFixture<ProdutosFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutosFormComponent],
      imports: [HttpClientModule, ReactiveFormsModule],
      providers: [CrudService]
    });
    fixture = TestBed.createComponent(ProdutosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
