import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup} from '@angular/forms';
import { SignService } from '../services/sign.service';
import { ActivatedRoute, Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  
  payment: FormGroup;
  email: string = '';
  constructor(private myBuilder: FormBuilder,
              private profileService: SignService,
              private router: Router,
              private spinner:NgxSpinnerService,private activatedRoute:ActivatedRoute) { }
              

  
              ngOnInit() {
                console.log(JSON.parse(sessionStorage.getItem("userdata")));
                
                this.payment = this.myBuilder.group({
                  FirstName1: [''],
                  LastName1: [''],
                  contact_number: [''],
                  Email2: [''],
                  amount: [''],
                  invoicenumber:['']
                });
            // this.patchProfileForm();
            console.log(localStorage.getItem('activeinvoiceForPaymentt'))
            let amount = this.activatedRoute.snapshot.url[1].path;
            this.payment.controls['FirstName1'].patchValue(JSON.parse(sessionStorage.getItem("userdata"))[0].first_name);
            this.payment.controls['LastName1'].patchValue(JSON.parse(sessionStorage.getItem("userdata"))[0].last_name);
            this.payment.controls['contact_number'].patchValue(JSON.parse(sessionStorage.getItem("userdata"))[0].contact_no);
            this.payment.controls['Email2'].patchValue(JSON.parse(sessionStorage.getItem("userdata"))[0].mail_id);
            this.payment.controls['amount'].patchValue(amount);
            this.payment.controls['invoicenumber'].patchValue(localStorage.getItem('activeinvoiceForPaymentt'));
          }


        //       paymentForm( model: FormGroup){
        //           this.spinner.show();
        //           console.log(model.value);
        //           this.profileService.initiatePayment( model.value).subscribe( response => {
        //             // this.router.navigate(['membership-module']);
        //            if(response.status == true){
        //                     this.paymentBid();
        //             }
        //               /*swal.fire(
        //                 'Success',
        //                 'Payment Successful',
        //                 'success'
        //               )
        //               this.navigateTo();*/
        //           })
        //   }

          paymentBid(model: FormGroup){
            this.spinner.show();
            console.log(model.value);
            this.profileService.apiBidPayment(model.value).subscribe( response => {
                console.log(response);
                this.spinner.hide();
                console.log(response.responseData.payment_request.longurl);
                window.open(response.responseData.payment_request.longurl, "_blank");

            });
          }
navigateTo(){
  this.router.navigate(['membership-module']);
} 
}
