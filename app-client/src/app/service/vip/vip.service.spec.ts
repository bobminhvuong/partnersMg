import { TestBed } from '@angular/core/testing';

import { VipService } from './vip.service';

describe('VipService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VipService = TestBed.get(VipService);
    expect(service).toBeTruthy();
  });
});
