import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl} from '@angular/forms';
import { FormService } from '../services/form.service';
import { MembershipService } from '../services/membership.service';
import { NgxSpinnerService } from 'ngx-spinner';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';  
import swal from 'sweetalert2';
import {Location} from '@angular/common';


@Component({
  selector: 'app-certi-table',
  templateUrl: './certi-table.component.html',
  styleUrls: ['./certi-table.component.css']
})
export class CertiTableComponent implements OnInit {

  // @ViewChild('content', jspdf) content: ElementRef;
  membership_id_f:string;
  membershipList: any[] = [];
  membershipId: string;
  issuedDate: string;
  companyName: string;
  downloadView: Boolean = false;

  constructor(private builder: FormBuilder, private spinner:NgxSpinnerService,private _location: Location,
    private membershipService: MembershipService) { }

  ngOnInit() {
     this.getMemberships();
  }

  getMemberships(){
    this.spinner.show();
    this.membershipList = [];
    this.membershipService.getMemberships().subscribe( response => {
        console.log(response);
        if(response.status === false) {
            this.spinner.hide();
            swal.fire(
                'Alert!',
                "Sorry you are not a valid Member!!",
                'error'
            );
            this._location.back();

        } else {

            // console.log(response.data);
            this.membershipList = response.data;
            this.spinner.hide();
        }
    })
  }

  view(data){
    this.membershipId = "";
    this.issuedDate = "";
    this.companyName = "";
   
      console.log(data);
      this.membershipId = data.membership_id;
      this.issuedDate = data.cert_issued_date;
      this.companyName = data.member_company_name; 
      this.downloadView = true; 
      
  }


  public downloadPdf(){
    html2canvas(document.getElementById('downloadView')).then(canvas => {
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('certificate.pdf');
    });
  }
}
