import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLeaseComponent } from './update-lease.component';

describe('UpdateLeaseComponent', () => {
  let component: UpdateLeaseComponent;
  let fixture: ComponentFixture<UpdateLeaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateLeaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateLeaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
