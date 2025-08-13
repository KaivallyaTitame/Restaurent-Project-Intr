import { TestBed } from '@angular/core/testing';

import { RestaurentsService } from './restaurents.service';

describe('RestaurentsService', () => {
  let service: RestaurentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
