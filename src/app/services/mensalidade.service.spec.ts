import { TestBed } from '@angular/core/testing';

import { MensalidadeService } from './mensalidade.service';

describe('MensalidadeService', () => {
  let service: MensalidadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MensalidadeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
