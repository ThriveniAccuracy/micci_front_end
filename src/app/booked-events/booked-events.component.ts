import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EventsService } from '../services/events.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-booked-events',
  templateUrl: './booked-events.component.html',
  styleUrls: ['./booked-events.component.css']
})

export class BookedEventsComponent implements OnInit {
  modalRef: BsModalRef;
  events:FormGroup;
  eventList:any[];
  membership_id_f:string;
  constructor(private modalService: BsModalService, private http:EventsService,
    private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.getBookedEvents();
  }

  getBookedEvents(){
    this.spinner.show();
    this.eventList = [];
    this.http.getBookedEvents().subscribe(res => {
      this.eventList = res['data'];
      console.log(this.eventList);
      this.spinner.hide();
    })
  }
}
