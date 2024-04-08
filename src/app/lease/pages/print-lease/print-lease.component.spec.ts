import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintLeaseComponent } from './print-lease.component';

describe('PrintLeaseComponent', () => {
  let component: PrintLeaseComponent;
  let fixture: ComponentFixture<PrintLeaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintLeaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintLeaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
