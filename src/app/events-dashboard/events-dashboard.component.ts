import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-events-dashboard',
  templateUrl: './events-dashboard.component.html',
  styleUrls: ['./events-dashboard.component.css']
})
export class EventsDashboardComponent implements OnInit {
  eventAttendList:any = [];
  constructor(private eventsService:EventsService,private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.getEventsStatus();
  }

  getEventsStatus(){
      this.spinner.show();
    this.eventsService.getEventAttendStatus().subscribe(res => {
        console.log(this.eventAttendList);
        this.eventAttendList = res['data'];
        this.spinner.hide();
      // console.log(res);
    })
  }

}
