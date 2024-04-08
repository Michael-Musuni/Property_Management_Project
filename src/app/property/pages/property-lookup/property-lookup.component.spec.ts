import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyLookupComponent } from './property-lookup.component';

describe('PropertyLookupComponent', () => {
  let component: PropertyLookupComponent;
  let fixture: ComponentFixture<PropertyLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
