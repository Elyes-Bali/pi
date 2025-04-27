import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientConferencesComponent } from './client-conferences.component';

describe('ClientConferencesComponent', () => {
  let component: ClientConferencesComponent;
  let fixture: ComponentFixture<ClientConferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientConferencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientConferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
