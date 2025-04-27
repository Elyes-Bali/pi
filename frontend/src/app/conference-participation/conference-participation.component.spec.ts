import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConferenceParticipationComponent } from './conference-participation.component';

describe('ConferenceParticipationComponent', () => {
  let component: ConferenceParticipationComponent;
  let fixture: ComponentFixture<ConferenceParticipationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConferenceParticipationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConferenceParticipationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
