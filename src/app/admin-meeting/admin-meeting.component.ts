import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-admin-meeting',
  templateUrl: './admin-meeting.component.html',
  styleUrls: ['./admin-meeting.component.css']
})
export class AdminMeetingComponent implements OnInit {
  sigdisplay = 'none';
  sigdisplay2 = 'none';
  sigdisplay3 = 'none';
  constructor(private service:AdminService,private spinner:NgxSpinnerService,) { }

  ngOnInit() {
    this.getDataOfUnknown();
  }

  getDataOfUnknown(){
      this.spinner.show();
    this.service.getUnknown().subscribe(res => {
      console.log(res);
      this.spinner.hide();
      
    });

  }

  showAddModal() {
    this.sigdisplay = 'block';
  }

  hideAddModal(): void {
    this.sigdisplay = 'none';
  }

  showUpdateModal(){
    this.sigdisplay2 = 'block';
  }

  hideUpdateModal(){
    this.sigdisplay2 = 'none';
  }

  showDeleteModal(){
    this.sigdisplay3 = 'block';
  }

  hideDeleteModal(){
    this.sigdisplay3 = 'none';
  }
}
