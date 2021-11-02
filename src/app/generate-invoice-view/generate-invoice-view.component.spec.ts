import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateInvoiceViewComponent } from './generate-invoice-view.component';

describe('GenerateInvoiceViewComponent', () => {
  let component: GenerateInvoiceViewComponent;
  let fixture: ComponentFixture<GenerateInvoiceViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateInvoiceViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateInvoiceViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
