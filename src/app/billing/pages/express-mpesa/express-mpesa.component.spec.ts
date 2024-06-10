import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpressMpesaComponent } from './express-mpesa.component';

describe('ExpressMpesaComponent', () => {
  let component: ExpressMpesaComponent;
  let fixture: ComponentFixture<ExpressMpesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpressMpesaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpressMpesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
