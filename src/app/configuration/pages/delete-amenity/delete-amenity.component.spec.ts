import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAmenityComponent } from './delete-amenity.component';

describe('DeleteAmenityComponent', () => {
  let component: DeleteAmenityComponent;
  let fixture: ComponentFixture<DeleteAmenityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAmenityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAmenityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
