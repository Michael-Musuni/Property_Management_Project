import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenantlookupComponent } from './tenantlookup.component';

describe('TenantlookupComponent', () => {
  let component: TenantlookupComponent;
  let fixture: ComponentFixture<TenantlookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenantlookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenantlookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
