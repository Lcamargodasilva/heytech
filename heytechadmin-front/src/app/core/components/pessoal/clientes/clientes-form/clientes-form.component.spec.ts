import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesFormComponent } from './clientes-form.component';
import { HttpClientModule } from '@angular/common/http';
import { CrudService } from 'src/app/shared/service/crud.service';
import { CelularPipe } from '../../pipes/celular.pipe';
import { ReactiveFormsModule } from '@angular/forms';

describe('ClientesFormComponent', () => {
  let component: ClientesFormComponent;
  let fixture: ComponentFixture<ClientesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ClientesFormComponent,
        CelularPipe
      ],
      imports: [
        HttpClientModule,
        ReactiveFormsModule
      ],
      providers: [CrudService]
    });
    fixture = TestBed.createComponent(ClientesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
