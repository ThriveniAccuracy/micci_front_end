import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { SignService } from '../services/sign.service';
import { Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  profile: FormGroup;
  email: string = '';
  constructor(private myBuilder: FormBuilder,
              private profileService: SignService,
              private router: Router,
              private spinner:NgxSpinnerService) { }

  ngOnInit() {
    // console.log(sessionStorage.getItem("userdata"));
    
    this.profile=this.myBuilder.group({
      FirstName1: [''],
      MiddleName1: [''],
      LastName1: [''],
      contact_number: [''],
      mobile_number: [''],
      companyName: [''],
      designation: [''],
      Email2: [''],
      applicantStatus: ['']

    });
this.patchProfileForm();
  }

  patchProfileForm(){
    this.spinner.show();
    this.profileService.getProfile().subscribe( response => {
      console.log(response['data'][0]);
      this.email = response['data'][0].mail_id;
      this.profile.controls['Email2'].patchValue(this.email);

      this.profile.patchValue({
        FirstName1: response['data'][0].first_name,
        MiddleName1: response['data'][0].middle_name,
        LastName1: response['data'][0].last_name,
        contact_number: response['data'][0].contact_no,
        mobile_number: response['data'][0].mobile_no,
        companyName: response['data'][0].user_company_name,
        designation: response['data'][0].designation,
        applicantStatus: response['data'][0].application_status
      });
      this.spinner.hide();
    })
}

profileForm( model: FormGroup){
  this.spinner.show();
  this.profileService.updateProfile( model.value).subscribe( response => {
    
    // this.router.navigate(['membership-module']);
    this.spinner.hide();
      swal.fire(
        'Success',
        'Profile Updated Successful',
        'success'
    )
    //   this.navigateTo();
  })
}
navigateTo(){
  this.router.navigate(['membership-module']);
} 
}
