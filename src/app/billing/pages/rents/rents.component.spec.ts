import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentsComponent } from './rents.component';

describe('RentsComponent', () => {
  let component: RentsComponent;
  let fixture: ComponentFixture<RentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
