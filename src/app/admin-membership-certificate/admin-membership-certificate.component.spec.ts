import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMembershipCertificateComponent } from './admin-membership-certificate.component';

describe('AdminMembershipCertificateComponent', () => {
  let component: AdminMembershipCertificateComponent;
  let fixture: ComponentFixture<AdminMembershipCertificateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminMembershipCertificateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMembershipCertificateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
