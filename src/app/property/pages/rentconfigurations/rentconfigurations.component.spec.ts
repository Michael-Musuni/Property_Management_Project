import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentconfigurationsComponent } from './rentconfigurations.component';

describe('RentconfigurationsComponent', () => {
  let component: RentconfigurationsComponent;
  let fixture: ComponentFixture<RentconfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentconfigurationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentconfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
