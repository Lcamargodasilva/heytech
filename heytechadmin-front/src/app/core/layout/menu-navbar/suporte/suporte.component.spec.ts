import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuporteComponent } from './suporte.component';
import { FormsModule } from '@angular/forms';

describe('SuporteComponent', () => {
  let component: SuporteComponent;
  let fixture: ComponentFixture<SuporteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuporteComponent],
      imports: [FormsModule]
    });
    fixture = TestBed.createComponent(SuporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
