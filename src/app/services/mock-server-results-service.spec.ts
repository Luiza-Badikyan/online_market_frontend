import { TestBed } from '@angular/core/testing';

import { MockServerResultsService } from './mock-server-results.service';

describe('MockServerResultsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockServerResultsService = TestBed.get(MockServerResultsService);
    expect(service).toBeTruthy();
  });
});
