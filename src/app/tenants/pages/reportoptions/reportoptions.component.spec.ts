import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportoptionsComponent } from './reportoptions.component';

describe('ReportoptionsComponent', () => {
  let component: ReportoptionsComponent;
  let fixture: ComponentFixture<ReportoptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportoptionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportoptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
