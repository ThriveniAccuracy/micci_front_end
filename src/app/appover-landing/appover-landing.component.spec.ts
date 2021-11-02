import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoverLandingComponent } from './appover-landing.component';

describe('AppoverLandingComponent', () => {
  let component: AppoverLandingComponent;
  let fixture: ComponentFixture<AppoverLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppoverLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppoverLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
