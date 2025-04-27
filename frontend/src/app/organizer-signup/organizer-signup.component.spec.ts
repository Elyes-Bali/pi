import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizerSignupComponent } from './organizer-signup.component';

describe('OrganizerSignupComponent', () => {
  let component: OrganizerSignupComponent;
  let fixture: ComponentFixture<OrganizerSignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizerSignupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizerSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
