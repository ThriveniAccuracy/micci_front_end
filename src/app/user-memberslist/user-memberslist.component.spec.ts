import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserMemberslistComponent } from './user-memberslist.component';

describe('UserMemberslistComponent', () => {
  let component: UserMemberslistComponent;
  let fixture: ComponentFixture<UserMemberslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserMemberslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserMemberslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
