import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { SignService } from '../services/sign.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import {Location} from '@angular/common';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  details: FormGroup;
  email: string = '';
  status : any;

  constructor(private myBuilder: FormBuilder,
              private signService: SignService,
              private router: Router,
              private spinner:NgxSpinnerService,private _location: Location) { }

  ngOnInit() {

    this.details=this.myBuilder.group({
      FirstName1: [''],
      MiddleName1: [''],
      LastName1: [''],
      Date: [''],
      contactNumber: [''],
      companyName: [''],
      number: [''],
      Email: [''],
      status: [''],
      applicantStatus: [''],
      amount: [''],
      invoiceNumber: [''],
      receiptNumber: [''],
      certificateNumber: ['']

    });
    this.patchProfileForm();
  }

  patchProfileForm(){
    this.spinner.show();
    this.signService.getMemberDetails().subscribe( response => {
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
            console.log(response['data'][0]);
      this.status=response['data'][0].membership_status;
      
      this.details.patchValue({
        FirstName1: response['data'][0].first_name,
        MiddleName1: response['data'][0].middle_name,
        LastName1: response['data'][0].last_name,
        Email: response['data'][0].mail_id,
        companyName:response['data'][0].user_company_name,
        contactNumber: response['data'][0].contact_no,
        status:response['data'][0].membership_status,
        applicantStatus:response['data'][0].membership_status,
        amount: response['data'][0].total_amount,
        invoiceNumber: response['data'][0].invoice_no,
        receiptNumber: response['data'][0].receipt_no,
        certificateNumber: response['data'][0].certificate_no,
        // mobile_number: response['data'][0].mobile_no,
        // companyName: response['data'][0].company_name,
        // designation: response['data'][0].designation,
        // applicantStatus: response['data'][0].applicant_status
      })
            
            this.spinner.hide();
        }
      
    //   this.spinner.hide();
    })
}

}
