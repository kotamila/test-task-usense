import { TestBed } from '@angular/core/testing';

import { PasswordApiService } from './password-api.service';

describe('PasswordApiService', () => {
  let service: PasswordApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
