import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdverificationComponent } from './idverification.component';

describe('IdverificationComponent', () => {
  let component: IdverificationComponent;
  let fixture: ComponentFixture<IdverificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdverificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdverificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
