import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SignService } from '../services/sign.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  //public loginDetails:any[];
  signIn: FormGroup;
    

  constructor(private myBuilder: FormBuilder,
              private signService: SignService,
              private router: Router,
              private spinner:NgxSpinnerService
               ) { }
  
  get f() { return this.signIn.controls; }
  ngOnInit() {

    this.signIn=this.myBuilder.group({      
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6)]]

    });
  }
          
  signInForm( model: FormGroup){
    this.spinner.show();
    this.signService.postMethod1( model.value).subscribe( response => {
      console.log(response);
      if(response.status === false) {
        this.spinner.hide();
        swal.fire(
          'Error',
          response.message,
          'error'
        )
      } else {
        sessionStorage.setItem('userdata', JSON.stringify(response.data));

        sessionStorage.setItem('usermembership', JSON.stringify(response.membership));
        // this.router.navigate(['app-profile']);
        //this.loginDetails = response['data'];
        console.log(response.data[0].user_type);
        var user_type = response.data[0].user_type;
        localStorage.setItem("user_type", user_type);
        console.log(user_type,"ut");
        if(response.data[0].user_type == "applicant"){
          // this.router.navigate(['app-profile']);
           this.router.navigate(['dashboard']);
          this.spinner.hide();
          swal.fire(
            'Success',
            'Login Successful',
            'success'
          )
        } else if(response.data[0].user_type == "Admin") {
          this.router.navigate(['admin-dashboard']);
          this.spinner.hide();
          swal.fire(
            'Success',
            'Login Successful',
            'success'
          )
        } else if(response.data[0].user_type == "Manager") {
            this.router.navigate(['manager-dashboard']);
            this.spinner.hide();
            swal.fire(
              'Success',
              'Login Successful',
              'success'
            )
        } else if(response.data[0].user_type == "Approver") {
            this.router.navigate(['appover-dashboard']);
            this.spinner.hide();
            swal.fire(
              'Success',
              'Login Successful',
              'success'
            )
        } else {
          this.spinner.hide();
          swal.fire(
            'Error',
            'User Type Not Exists',
            'error'
          )
        }
      }
      
     
      // this.navigateTo();
    })
}
navigateTo(){
  this.router.navigate(['app-profile']);
} 

}
