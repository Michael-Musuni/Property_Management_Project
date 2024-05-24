import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertypreviewComponent } from './propertypreview.component';

describe('PropertypreviewComponent', () => {
  let component: PropertypreviewComponent;
  let fixture: ComponentFixture<PropertypreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertypreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertypreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
