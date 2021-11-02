import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MustMatch} from './must-match.validator';
import { SignService } from '../services/sign.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUp: FormGroup;
  display='none';
  

  get f() { return this.signUp.controls; }


  constructor(private myBuilder: FormBuilder, private signService: SignService,
              private router: Router,
              private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.signUp=this.myBuilder.group({
      first_name: ['', [Validators.pattern('^[a-zA-Z \-\']+')]],
       middle_name: ['',[Validators.pattern('^[a-zA-Z \-\']+')]],
      last_name: ['',  [Validators.pattern('^[a-zA-Z \-\']+')]],
       contact: ['', [Validators.required]],
       mobile: ['', [Validators.required]],
       companyName: ['', [Validators.pattern('^[a-zA-Z \-\']+')]],
       tradeName: ['', [Validators.pattern('^[a-zA-Z \-\']+')]],
       designation: ['', [Validators.pattern('^[a-zA-Z \-\']+')]],
      email: ['', [Validators.required, Validators.email]],
      state: ['', Validators.required],
      password: ['', [Validators.required,Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    },
    {
         validator: MustMatch('password','confirmPassword')
    });
  }

  keyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;

    const inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  

  signUpForm( model: FormGroup){
    this.spinner.show();
    console.log(model.value);
    this.signService.postMethod(model.value).subscribe( response => {
      console.log(response);
    //   var token = response.data;
    //   localStorage.setItem('token',token);
    //     console.log(token,"ut");
      
      if(response.message === 'Please check your email and authenticate your email') {
        this.spinner.hide();
        // this.router.navigate(["app-signIn"]);
        swal.fire(
          'Success',
          'Kindly check your email for authentication',
          'success'
        )

      }
    //   this.display = 'block';
    }, error => {
        this.spinner.hide();
        swal.fire(
          'Your Email Id is already registered, Please Log In!',
          error,
          'error'
        )
    })
}



}
