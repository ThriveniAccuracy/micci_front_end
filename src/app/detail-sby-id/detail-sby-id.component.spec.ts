import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSByIdComponent } from './detail-sby-id.component';

describe('DetailSByIdComponent', () => {
  let component: DetailSByIdComponent;
  let fixture: ComponentFixture<DetailSByIdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSByIdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
