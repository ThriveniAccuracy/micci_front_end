import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';
import { SignService } from '../services/sign.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';

@Component({
  selector: 'app-external-events',
  templateUrl: './external-events.component.html',
  styleUrls: ['./external-events.component.css']
})
export class ExternalEventsComponent implements OnInit {

  viewList:any[];
  bookEvent:FormGroup;
  totalAmount:string = '';
  constructor(private http:EventsService, private formBuilder:FormBuilder,
    private spinner:NgxSpinnerService, private profileService: SignService) { }

  ngOnInit() {
    this.bookEvent = this.formBuilder.group({
      first_name: ['', [Validators.pattern('^[a-zA-Z \-\']+')]],
      last_name: ['', [Validators.pattern('^[a-zA-Z \-\']+')]],
      email_address:  ['', [Validators.required, Validators.email]],
      company_name: ['', [Validators.pattern('^[a-zA-Z \-\']+')]],
      designation: ['', [Validators.pattern('^[a-zA-Z \-\']+')]],
      mobile_no: ['', [Validators.required]],
      event_name:['', [Validators.required]],
      no_of_tickets: ['', [Validators.required]],
      Price:[''],
      total:['', [Validators.required]]
    });
    this.getCreatedEvents();
  }

  get f() {
    return this.bookEvent.controls;
  }

  getCreatedEvents(){
    this.spinner.show();
    this.viewList = [];
    this.http.getEvents().subscribe(res => {
      this.viewList = res['data'];
      this.spinner.hide();
      // console.log(this.viewList);
    })
  }

  getSlectedEvent(num){
    console.log(num);
    this.bookEvent.controls['event_name'].patchValue(num['event_title']);
    this.bookEvent.controls['Price'].patchValue(num['price']);
  }

  onKeyUpTicket(event){
    let calculated = this.bookEvent.controls['Price'].value * parseInt(event);
    console.log(calculated);
    this.bookEvent.controls['total'].patchValue(calculated);
  }

  onSubmit(model:FormGroup){
    console.log(model.value);
    this.spinner.show();
    this.http.postExternalEvents(model.value).subscribe( res => {
      console.log(res);
      this.spinner.hide();
     
        // this.paymentBid(res.data);
        swal.fire(
          "Event Registered Successfully",
          'success'
        ).then(function(){
          location.reload();
        });
      
    },
    error => {
      swal.fire(
        'Failes!',
         error,
        'error'
      ).then(function(){
        // location.reload();
      }); 
     });

  }

//   paymentBid(data){
//     this.profileService.apiBidPaymentExtEvents(data.mail, data.usr_id).subscribe( response => {
//         console.log(response);
//         this.spinner.hide();
//         console.log(response.responseData.payment_request.longurl);
//         window.open(response.responseData.payment_request.longurl, "_blank");

//     });
//   }
}

