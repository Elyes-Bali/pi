import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateConferenceComponent } from './update-conference.component';

describe('UpdateConferenceComponent', () => {
  let component: UpdateConferenceComponent;
  let fixture: ComponentFixture<UpdateConferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateConferenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateConferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
