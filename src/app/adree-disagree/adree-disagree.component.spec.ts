import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdreeDisagreeComponent } from './adree-disagree.component';

describe('AdreeDisagreeComponent', () => {
  let component: AdreeDisagreeComponent;
  let fixture: ComponentFixture<AdreeDisagreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdreeDisagreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdreeDisagreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
