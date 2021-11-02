import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertiTableComponent } from './certi-table.component';

describe('CertiTableComponent', () => {
  let component: CertiTableComponent;
  let fixture: ComponentFixture<CertiTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertiTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertiTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
