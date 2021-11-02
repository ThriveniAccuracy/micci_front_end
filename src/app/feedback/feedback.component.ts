import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SignService } from '../services/sign.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {

  public feedback: FormGroup;
  
  first_name: string = '';
  middle_name: string = '';
  last_name: string = '';
  company_name: string = '';
 
  



  constructor(private myBuilder: FormBuilder, 
              private feedBackService: SignService,
              private spinner:NgxSpinnerService,
              private router: Router) { }

  ngOnInit() {
    this.first_name = JSON.parse(sessionStorage.getItem("userdata"))[0].first_name;
    this.middle_name = JSON.parse(sessionStorage.getItem("userdata"))[0].middle_name;
    this.last_name = JSON.parse(sessionStorage.getItem("userdata"))[0].last_name;
    this.company_name = JSON.parse(sessionStorage.getItem("userdata"))[0].user_company_name;

    
    this.feedback=this.myBuilder.group({
      firstName: ['', [Validators.required]],
      middleName: [''],
      lastName: ['', [Validators.required]],
      
      companyName: ['', [Validators.required]],
      comment: ['']
    

    });
  }

  feedBackForm( model: FormGroup){
    this.spinner.show();
    this.feedBackService.feedBack( model.value).subscribe( response => {
      // console.log(response);
      //this.router.navigate(['app-applicant']);
      this.spinner.hide();
      swal.fire(
        'Success',
        'Feedback Added Successfully',
        'success'
      )
    })
}

}
