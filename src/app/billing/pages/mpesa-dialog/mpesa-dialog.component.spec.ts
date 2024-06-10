import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MpesaDialogComponent } from './mpesa-dialog.component';

describe('MpesaDialogComponent', () => {
  let component: MpesaDialogComponent;
  let fixture: ComponentFixture<MpesaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MpesaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MpesaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
