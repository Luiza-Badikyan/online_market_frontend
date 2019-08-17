import { TestBed, async, inject } from '@angular/core/testing';

import { AuthLoadGuardGuard } from './auth-load-guard.guard';

describe('AuthLoadGuardGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthLoadGuardGuard]
    });
  });

  it('should ...', inject([AuthLoadGuardGuard], (guard: AuthLoadGuardGuard) => {
    expect(guard).toBeTruthy();
  }));
});
