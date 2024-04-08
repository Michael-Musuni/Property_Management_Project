import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteLeaseComponent } from './delete-lease.component';

describe('DeleteLeaseComponent', () => {
  let component: DeleteLeaseComponent;
  let fixture: ComponentFixture<DeleteLeaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteLeaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteLeaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
