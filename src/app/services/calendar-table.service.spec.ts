import { TestBed, inject } from '@angular/core/testing';

import { CalendarTableService } from './calendar-table.service';

describe('CalendarTableService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CalendarTableService]
    });
  });

  it('should be created', inject([CalendarTableService], (service: CalendarTableService) => {
    expect(service).toBeTruthy();
  }));
});
