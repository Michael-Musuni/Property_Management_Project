import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaseformComponent } from './leaseform.component';

describe('LeaseformComponent', () => {
  let component: LeaseformComponent;
  let fixture: ComponentFixture<LeaseformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaseformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaseformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
