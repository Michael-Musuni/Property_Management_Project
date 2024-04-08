import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatetenantComponent } from './updatetenant.component';

describe('UpdatetenantComponent', () => {
  let component: UpdatetenantComponent;
  let fixture: ComponentFixture<UpdatetenantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatetenantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatetenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
