import { Component, OnInit } from '@angular/core';
import { EventsService } from '../services/events.service';
import { SignService } from '../services/sign.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';

@Component({
  selector: 'app-book-events',
  templateUrl: './book-events.component.html',
  styleUrls: ['./book-events.component.css']
})

export class BookEventsComponent implements OnInit {
  viewList:any[];
  bookEvent:FormGroup;
  totalAmount:string = '';
  amount:any;
  constructor(private http:EventsService, private formBuilder:FormBuilder,
    private spinner:NgxSpinnerService, private profileService: SignService) { }

  ngOnInit() {
    this.bookEvent = this.formBuilder.group({
      EventName:[''],
      Tickets:['', [Validators.required]],
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
        console.log(res);
      this.viewList = res['data'];
      this.spinner.hide();
      // console.log(this.viewList);
    })
  }

  getEvents(num){
    // console.log(num);
    this.bookEvent.controls['EventName'].patchValue(num['event_title']);
    this.bookEvent.controls['Price'].patchValue(num['price']);
  }

  onKeyUpTicket(event){
    let calculated = this.bookEvent.controls['Price'].value * parseInt(event);
    console.log(calculated);
    this.bookEvent.controls['total'].patchValue(calculated);
  }

  onSubmit(model:FormGroup){
     console.log(model.value);
     this.amount=model.value.total
    this.http.postBookEvent(model.value).subscribe( res => {
        console.log(res);
        if(res.responseData.success === true) {
            console.log(res.responseData.payment_request.longurl);
            window.open(res.responseData.payment_request.longurl, "_blank");
        } else {
            swal.fire(
                'Failes!',
                 res.message,
                'error'
              ).then(function(){
                location.reload();
            });
        }
    //   swal.fire(
    //     res.message,
    //     'success'
    //   ).then(function(){
    //     location.reload();
    //   });
    },
    error => {
      swal.fire(
        'Failes!',
         error,
        'error'
      ).then(function(){
        location.reload();
      }); 
     });

  }

    //   paymentBid(amount){
    //     this.profileService.apiBidPaymentExtEvents(amount).subscribe( response => {
    //         console.log(response);
    //         this.spinner.hide();
    //         console.log(response.responseData.payment_request.longurl);
    //         window.open(response.responseData.payment_request.longurl, "_blank");
    //     });
    //   }

}
