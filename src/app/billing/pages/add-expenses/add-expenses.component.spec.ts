import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExpensesComponent } from './add-expenses.component';

describe('ViewExpensesComponent', () => {
  let component: AddExpensesComponent;
  let fixture: ComponentFixture<AddExpensesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExpensesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExpensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
