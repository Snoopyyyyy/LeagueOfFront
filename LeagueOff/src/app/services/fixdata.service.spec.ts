import { TestBed } from '@angular/core/testing';

import { FixdataService } from './fixdata.service';

describe('FixdataService', () => {
  let service: FixdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FixdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
