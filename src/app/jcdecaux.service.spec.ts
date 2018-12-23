import { TestBed } from '@angular/core/testing';

import { JcdecauxService } from './jcdecaux.service';

describe('JcdecauxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JcdecauxService = TestBed.get(JcdecauxService);
    expect(service).toBeTruthy();
  });
});
