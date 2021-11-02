import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppoverNavComponent } from './appover-nav.component';

describe('AppoverNavComponent', () => {
  let component: AppoverNavComponent;
  let fixture: ComponentFixture<AppoverNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppoverNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppoverNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
