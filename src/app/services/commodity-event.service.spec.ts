import { TestBed } from '@angular/core/testing';

import { CommodityEventService } from './commodity-event.service';

describe('CommodityEventService', () => {
  let service: CommodityEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommodityEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
