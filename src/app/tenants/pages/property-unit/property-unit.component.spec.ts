import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyUnitComponent } from './property-unit.component';

describe('PropertyUnitComponent', () => {
  let component: PropertyUnitComponent;
  let fixture: ComponentFixture<PropertyUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
