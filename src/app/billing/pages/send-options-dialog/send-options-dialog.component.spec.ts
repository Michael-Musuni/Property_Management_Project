import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendOptionsDialogComponent } from './send-options-dialog.component';

describe('SendOptionsDialogComponent', () => {
  let component: SendOptionsDialogComponent;
  let fixture: ComponentFixture<SendOptionsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendOptionsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendOptionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
