import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUtilityComponent } from './delete-utility.component';

describe('DeleteUtilityComponent', () => {
  let component: DeleteUtilityComponent;
  let fixture: ComponentFixture<DeleteUtilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteUtilityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteUtilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
