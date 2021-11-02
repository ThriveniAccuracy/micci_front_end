import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMeetingComponent } from './admin-meeting.component';

describe('AdminMeetingComponent', () => {
  let component: AdminMeetingComponent;
  let fixture: ComponentFixture<AdminMeetingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMeetingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMeetingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
