import { TestBed } from '@angular/core/testing';

import { CashRegisterEventService } from './cash-register-event.service';

describe('CashRegisterEventService', () => {
  let service: CashRegisterEventService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashRegisterEventService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
