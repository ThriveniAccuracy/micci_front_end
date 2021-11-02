import { Component, OnInit } from '@angular/core';
import { FormService } from '../services/form.service';


@Component({
  selector: 'app-enquiries',
  templateUrl: './enquiries.component.html',
  styleUrls: ['./enquiries.component.css']
})
export class EnquiriesComponent implements OnInit {

  dataList:any[];

  constructor(private formService: FormService) { }

  ngOnInit() {
    this.getCompanyAddress();
  }


  getCompanyAddress(){
    this.dataList = [];
    this.formService.getCompanyAddress().subscribe(res => {
      // console.log(res);
      this.dataList = res['data'];
      console.log(this.dataList);
    })
  }

}
