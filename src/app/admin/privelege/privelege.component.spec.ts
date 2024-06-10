import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivelegeComponent } from './privelege.component';

describe('PrivelegeComponent', () => {
  let component: PrivelegeComponent;
  let fixture: ComponentFixture<PrivelegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrivelegeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivelegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
