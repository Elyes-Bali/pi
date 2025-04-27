import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllOrganizersComponent } from './all-organizers.component';

describe('AllOrganizersComponent', () => {
  let component: AllOrganizersComponent;
  let fixture: ComponentFixture<AllOrganizersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllOrganizersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllOrganizersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
