import { TestBed } from '@angular/core/testing';

import { MatrizMonitorService } from './matriz-monitor.service';

describe('MatrizMonitorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatrizMonitorService = TestBed.get(MatrizMonitorService);
    expect(service).toBeTruthy();
  });
});
