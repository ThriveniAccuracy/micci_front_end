import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoverDashboardComponent } from './appover-dashboard.component';

describe('AppoverDashboardComponent', () => {
  let component: AppoverDashboardComponent;
  let fixture: ComponentFixture<AppoverDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppoverDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppoverDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
