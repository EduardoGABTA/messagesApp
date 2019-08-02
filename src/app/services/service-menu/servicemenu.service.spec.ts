import { TestBed } from '@angular/core/testing';

import { ServicemenuService } from './servicemenu.service';

describe('ServicemenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicemenuService = TestBed.get(ServicemenuService);
    expect(service).toBeTruthy();
  });
});
