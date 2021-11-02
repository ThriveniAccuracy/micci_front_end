import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SignService } from '../services/sign.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import { MustMatch } from './must-match.validator';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {

  forgetPassword: FormGroup;

  get f() { return this.forgetPassword.controls; }


  constructor(private myBuilder: FormBuilder,
              //  private myBuilder: FormBuilder,
              private signService: SignService,
              private router: Router,
              private spinner:NgxSpinnerService) { }

  ngOnInit() {
      
    this.forgetPassword=this.myBuilder.group({
      
      Email5: ['', [Validators.required, Validators.email]],
      newPassword: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    },{
      validator: MustMatch('newPassword', 'confirmPassword')
    });

  }

  forgetPasswordForm( model: FormGroup){
    this.spinner.show();
    this.signService.forgotPassword( model.value).subscribe( response => {
      console.log(response);
      
      this.spinner.hide();
      
      swal.fire(
        'Success',
        'Password Changed Successfully',
        'success'
      )
      this.navigateTo();
    })
}
navigateTo(){
  this.router.navigate(['app-signIn']);
} 

}
