import { TestBed } from '@angular/core/testing';

import { PropertyConfigService } from './property-config.service';

describe('PropertyConfigService', () => {
  let service: PropertyConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertyConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
