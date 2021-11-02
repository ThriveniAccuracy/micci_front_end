import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { SignService } from '../services/sign.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  profile: FormGroup;
  email: string = '';
  data_count: number;
  memberShipStatus: string;
  url : any;
  profile_pic :any;
 
  constructor(private myBuilder: FormBuilder,private profileService: SignService,private spinner:NgxSpinnerService) { }

  ngOnInit() {
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
    this.getEventCount()
  }


  patchProfileForm(){
    this.spinner.show();
    this.profileService.getProfile().subscribe( response => {
      console.log(response);
      this.memberShipStatus =  response['data'][0].membership_status;
    //   JSON.parse(sessionStorage.getItem("usermembership"))      
      console.log(this.memberShipStatus)
      this.email = response['data'][0].mail_id;
      this.profile_pic = response['data'][0].upload_profile;
      this.profile.controls['Email2'].patchValue(this.email);

      this.profile.patchValue({
        FirstName1: response['data'][0].first_name,
        MiddleName1: response['data'][0].middle_name,
        LastName1: response['data'][0].last_name,
        contact_number: response['data'][0].contact_no,
        mobile_number: response['data'][0].mobile_no,
        companyName: response['data'][0].user_company_name,
        designation: response['data'][0].designation,
        applicantStatus: response['data'][0].applicant_status
      });
      this.spinner.hide();
    })
}


getEventCount(){
    this.spinner.show();
  console.log("dsfsf")
  this.profileService.getEventCount().subscribe( response => {
    console.log(response['data'].length);
    this.data_count = response['data'].length
    this.spinner.hide();
  })
}

onSelectFile(event) {
    console.log(event.target.files.length);
    console.log(event.target.files);
    if (event.target.files.length > 0) {
      this.url = event.target.files
      console.log(this.url);
      const formData = new FormData();
      for (let img of this.url) {
        console.log(img);
        formData.append('Profile', img);
      }
      formData.append('mail_id', this.email);
      console.log(this.email);
      console.log(formData);
      this.spinner.show();
        this.profileService.updateProfilePhoto(formData).subscribe(response => {
            this.patchProfileForm();
            this.spinner.hide();
        }, error => {
            this.spinner.hide();
            swal.fire(
              'Failes!',
              error,
              'error'
            )
        })
    }
}

}
