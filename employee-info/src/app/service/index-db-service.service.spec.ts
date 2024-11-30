import { TestBed } from '@angular/core/testing';

import { IndexDbService } from './index-db-service.service';

describe('IndexDbServiceService', () => {
  let service: IndexDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IndexDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
