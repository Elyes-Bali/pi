import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyConferencesComponent } from './my-conferences.component';

describe('MyConferencesComponent', () => {
  let component: MyConferencesComponent;
  let fixture: ComponentFixture<MyConferencesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyConferencesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyConferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
