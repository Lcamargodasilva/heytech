import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from '../menu-navbar/navbar/navbar.component';
import { IndexComponent } from './index.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../service/auth.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterModule } from '@angular/router';

describe('IndexComponent', () => {
  let component: IndexComponent;
  let fixture: ComponentFixture<IndexComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        IndexComponent, 
        NavbarComponent,
        SidebarComponent,
        FooterComponent
      ],
      imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        RouterModule.forRoot([]),
        ModalModule.forRoot()
      ],
      providers: [
        AuthService,
        BsModalService
      ]
    });
    fixture = TestBed.createComponent(IndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
