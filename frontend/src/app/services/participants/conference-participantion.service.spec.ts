import { TestBed } from '@angular/core/testing';

import { ConferenceParticipantionService } from './conference-participantion.service';

describe('ConferenceParticipantionService', () => {
  let service: ConferenceParticipantionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConferenceParticipantionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
