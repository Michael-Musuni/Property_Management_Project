import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUtilityComponent } from './edit-utility.component';

describe('EditUtilityComponent', () => {
  let component: EditUtilityComponent;
  let fixture: ComponentFixture<EditUtilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditUtilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUtilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
