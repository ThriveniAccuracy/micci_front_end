import { Component, OnInit } from '@angular/core';
import { FormService } from '../services/form.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import {Location} from '@angular/common';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  getData:any[];
  membership_id_f:any;
  filterData:any;
  constructor(private http:FormService, private spinner:NgxSpinnerService,private _location: Location,) { }

  ngOnInit() {
    this.getNoticeData();
  }

  getNoticeData(){
    this.spinner.show();
    this.getData = [];
    this.http.getRenewalNoticeData().subscribe(res => {
        console.log(res);
        if(res.status === false) {
            this.spinner.hide();
            swal.fire(
                'Alert!',
                "You don't have any renewal currently!!",
                'error'
            );
            this._location.back();
    
        } else {
    
            this.getData = res['message'];
            this.filterData = res['message'];
            console.log(this.getData);
            this.spinner.hide();
        }
      
    //   this.spinner.hide();
    })
  }

  applyFilter(event:string) {
    let filterValueLower = event;
    console.log(filterValueLower);
    if(event === "null" ) {
        this.getData = this.filterData;
    } else  if(event === "Pending" ) {
        this.getData  = this.filterData.filter((id) => id.payment_status === 'Pending')
        console.log(this.getData);
    } else {
        console.log(event)
       this.getData  = this.filterData.filter((id) => id.payment_status === event)
       console.log(this.getData)
    }

}

}
