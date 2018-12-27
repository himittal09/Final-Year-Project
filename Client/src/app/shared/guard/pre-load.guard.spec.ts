import { TestBed, async, inject } from '@angular/core/testing';

import { PreLoadGuard } from './pre-load.guard';

describe('PreLoadGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreLoadGuard]
    });
  });

  it('should ...', inject([PreLoadGuard], (guard: PreLoadGuard) => {
    expect(guard).toBeTruthy();
  }));
});
