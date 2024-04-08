import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLeaseComponent } from './view-lease.component';

describe('ViewLeaseComponent', () => {
  let component: ViewLeaseComponent;
  let fixture: ComponentFixture<ViewLeaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewLeaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewLeaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
