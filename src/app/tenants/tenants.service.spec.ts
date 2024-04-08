import { TestBed } from '@angular/core/testing';

import { TenantService } from './tenants.service';

describe('TenantsService', () => {
  let service: TenantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TenantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

