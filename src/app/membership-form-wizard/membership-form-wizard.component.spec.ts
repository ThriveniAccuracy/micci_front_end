import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipFormWizardComponent } from './membership-form-wizard.component';

describe('MembershipFormWizardComponent', () => {
  let component: MembershipFormWizardComponent;
  let fixture: ComponentFixture<MembershipFormWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembershipFormWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipFormWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
