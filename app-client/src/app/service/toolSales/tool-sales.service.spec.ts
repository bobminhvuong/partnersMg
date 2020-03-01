import { TestBed } from '@angular/core/testing';

import { ToolSalesService } from './tool-sales.service';

describe('ToolSalesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToolSalesService = TestBed.get(ToolSalesService);
    expect(service).toBeTruthy();
  });
});
