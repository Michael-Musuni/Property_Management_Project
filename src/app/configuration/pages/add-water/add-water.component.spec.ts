import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWaterComponent } from './add-water.component';

describe('AddWaterComponent', () => {
  let component: AddWaterComponent;
  let fixture: ComponentFixture<AddWaterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWaterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddWaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
