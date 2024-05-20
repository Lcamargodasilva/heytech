import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ClientesListaComponent } from './clientes-lista.component';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CrudService } from 'src/app/shared/service/crud.service';

describe('ClientesListaComponent', () => {
  let component: ClientesListaComponent;
  let fixture: ComponentFixture<ClientesListaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientesListaComponent],
      imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        ModalModule.forRoot()
      ],
      providers: [
        BsModalService,
        CrudService
      ]
    });
    fixture = TestBed.createComponent(ClientesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
