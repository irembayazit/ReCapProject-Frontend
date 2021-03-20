import { TestBed } from '@angular/core/testing';

import { RentalByCarIdService } from './rental-by-car-id.service';

describe('RentalByCarIdService', () => {
  let service: RentalByCarIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentalByCarIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
