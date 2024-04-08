import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyWidgetsComponent } from './property-widgets.component';

describe('PropertyWidgetsComponent', () => {
  let component: PropertyWidgetsComponent;
  let fixture: ComponentFixture<PropertyWidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyWidgetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
