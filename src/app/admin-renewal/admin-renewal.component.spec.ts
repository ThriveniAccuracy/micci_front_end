import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRenewalComponent } from './admin-renewal.component';

describe('AdminRenewalComponent', () => {
  let component: AdminRenewalComponent;
  let fixture: ComponentFixture<AdminRenewalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRenewalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRenewalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
