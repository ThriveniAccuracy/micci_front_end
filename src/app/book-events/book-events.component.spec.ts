import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookEventsComponent } from './book-events.component';

describe('BookEventsComponent', () => {
  let component: BookEventsComponent;
  let fixture: ComponentFixture<BookEventsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookEventsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
