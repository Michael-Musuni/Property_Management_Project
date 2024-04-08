import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainconfigComponent } from './mainconfig.component';

describe('MainComponent', () => {
  let component: MainconfigComponent;
  let fixture: ComponentFixture<MainconfigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainconfigComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainconfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
