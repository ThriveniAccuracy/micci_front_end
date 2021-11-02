import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipProfileComponent } from './membership-profile.component';

describe('MembershipProfileComponent', () => {
  let component: MembershipProfileComponent;
  let fixture: ComponentFixture<MembershipProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
