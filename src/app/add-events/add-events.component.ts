import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { EventsService } from '../services/events.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.component.html',
  styleUrls: ['./add-events.component.css']
})

export class AddEventsComponent implements OnInit {

  @ViewChild('UpdateEvents',null) UpdateEvents: NgForm;
  
  modalRef: BsModalRef;
  events:FormGroup;
  // UpdateEvents:FormGroup;
  deleteEvent:FormGroup;
  switchButton:FormGroup;
  membership_id_f:string;
  viewList:any[];
  DeleteTitle = '';
  sigdisplay = 'none';
  sigdisplay2 = 'none';
  sigdisplay3 = 'none';
  errorMsg:string = '';
  isAlreadyExistTitle:boolean = false;
  loadSpin:boolean = false;
  imageSrc: string;
  imageSrcAdd: string;
  upload_pic = '';
  public startDate = new FormControl(new Date());
  public minDate = new Date();

  public form: {
    Event_description: string;
    Start_date: string;
    End_date: string;
    Venue: string;
    tickets_available: string;
    Price: string;
    upload_pic: File | null;
    Event_title: string;
  };

  public updateform: {
    Event_title: string;
    Event_description: string;
    Start_date: string;
    End_date: string;
    Venue: string;
    tickets_available: string;
    Price: string;
    Event_id: string;
    upload_pic: File | null;
  };
  constructor(private modalService: BsModalService, private http:EventsService,
    private formBuilder:FormBuilder, private spinner:NgxSpinnerService) {
      this.form = {
        Event_description: "",
        Start_date: "",
        End_date: "",
        Venue: "",
        tickets_available: "",
        Price: "",
        upload_pic: null,
        Event_title: ""
      };

      this.updateform = {
        Event_title: "",
        Event_description: "",
        Start_date: "",
        End_date: "",
        Venue: "",
        tickets_available: "",
        Price: "",
        Event_id: "",
        upload_pic: null
        
      };
    }

  ngOnInit() {
    // this.events = this.formBuilder.group({
    //   eventTitle:['', Validators.required],
    //   description:['', Validators.required],
    //   startDate:['', Validators.required],
    //   endDate:['', Validators.required],
    //   venue:['', Validators.required],
    //   availableTickets:['', Validators.required],
    //   price:['', Validators.required]
    // });
    this.events = this.formBuilder.group({
      Event_title:[''],
      Event_description:[''],
      Start_date:[''],
      End_date:[''],
      Venue:[''],
      tickets_available:[''],
      Price:[''],
      upload_pic:['']
    });

    // this.UpdateEvents = this.formBuilder.group({
    //   Event_id:[''],
    //   Event_title:[''],
    //   Event_description:[''],
    //   Start_date:[''],
    //   End_date:[''],
    //   Venue:[''],
    //   tickets_available:[''],
    //   Price:[''],
    //   upload_pic:['']
    // });

    this.deleteEvent = this.formBuilder.group({
      eventTitle: ['', Validators.required]
    });

    this.switchButton = this.formBuilder.group({
      switch1: ['', Validators.required],
      switch2: ['', Validators.required],
      switch3: ['', Validators.required]
    })
    this.getCreatedEvents();
  }

  get f() {
    return this.events.controls;
  }

  onSubmit(model:FormGroup){
    console.log(model.value);
  }
  getCreatedEvents(){
    this.spinner.show();
    this.viewList = [];
    this.http.getEventsByAdmin().subscribe(res => {
        console.log(res);
      this.viewList = res['data'];
      this.spinner.hide();
    })
  }


  showAddModal() {
    this.sigdisplay = 'block';
  }

  hideAddModal(): void {
    this.sigdisplay = 'none';
  }

  showUpdateModal(){
    this.sigdisplay2 = 'block';
  }

  hideUpdateModal(){
    this.sigdisplay2 = 'none';
  }

  showDeleteModal(){
    this.sigdisplay3 = 'block';
  }

  hideDeleteModal(){
    this.sigdisplay3 = 'none';
  }

  getDataPatch(num){
    this.spinner.show();
    console.log(num);
      
   
      // this.UpdateEvents.controls['Event_title'].patchValue(num['event_title']);
      
    this.imageSrc = '';
    // this.UpdateEvents.controls['upload_pic'].updateValue('');
    this.upload_pic = '';
    this.UpdateEvents.controls['Event_id'].patchValue(num['event_id']);
    this.UpdateEvents.controls['Event_title'].patchValue(num['event_title']);
    this.UpdateEvents.controls['Event_description'].patchValue(num['event_description']);
    this.UpdateEvents.controls['Start_date'].patchValue(num['start_date']);
    this.UpdateEvents.controls['End_date'].patchValue(num['end_date']);
    this.UpdateEvents.controls['Venue'].patchValue(num['venue']);
    this.UpdateEvents.controls['tickets_available'].patchValue(num['tickets_available']);
    this.UpdateEvents.controls['Price'].patchValue(num['price']);
    this.imageSrc = num['upload_pic'];
    this.spinner.hide();
  }


  onFileChange(event) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imageSrc = reader.result as string;
     
        // this.UpdateEvents.controls['upload_pic'].patchValue(event['upload_pic']);
   
      };
   
    }
  }

  onFileChangeAdd(event) {
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imageSrcAdd = reader.result as string;
     
        // this.UpdateEvents.controls['upload_pic'].patchValue(event['upload_pic']);
   
      };
   
    }
  }
  deleteEventOnRow(num){
    // this.DeleteTitle = num;
    // console.log(this.DeleteTitle);
    // console.log(num);
    this.deleteEvent.controls['eventTitle'].patchValue(num);
    this.showDeleteModal();
  }
  
  onSubmitDelete(model:FormGroup){
    this.spinner.show();
    this.http.postDeleteEvent(model.value).subscribe( res => {
      this.spinner.hide();
      // console.log(res);
      swal.fire(
        'success!',
        'Event Deleted Successfully',
        'success'
        ).then(function(){
          // this.getCreatedEvents();
          location.reload();
        });
        },
        error => {
        this.spinner.hide();  
        swal.fire(
          'Failes!',
          error,
          'error'
        ).then(function(){
          location.reload();
        }); 
      });
  }

  // onEventsSubmit(model:FormGroup){
    
  //   this.http.postEvent(model.value).subscribe( res => {
  //     swal.fire(
  //             'success!',
  //             'Event Added Successfully',
  //             'success'
  //     ).then(function(){
  //       location.reload();
  //       });
  //   },
  //   error => {
  //     swal.fire(
  //       'Failes!',
  //        error,
  //       'error'
  //     ).then(function(){
  //       location.reload();
  //     }); 
  //    });
  // }

  public onEventsSubmit() : void {
    this.spinner.show();
    var Event_title = this.form.Event_title;
    var Event_description = this.form.Event_description;
    var Start_date = this.form.Start_date;
    var End_date = this.form.End_date;
    var Venue = this.form.Venue;
    var tickets_available = this.form.tickets_available;
    var Price = this.form.Price;
    // Dealing with the files requires a tiny bit of elbow-grease. Since NgModel
    // won't automatically grab the files from the file-input, we have to use the
    // (changes) event to grab them manually. Then, we have to pluck the first
    // File Blob from the given FileList.
    var upload_pic = ( this.form.upload_pic && this.form.upload_pic )
        ? this.form.upload_pic[ 0 ]
        : null
    ;
  
    
    this.http
        .postEvent({
          Event_description: Event_description,
          Start_date: Start_date,
          End_date: End_date,
          Venue: Venue,
          tickets_available: tickets_available,
          Price: Price,
          upload_pic: upload_pic,
          Event_title: Event_title
        })
        .then(
            () => {
          this.spinner.hide();

              swal.fire(
                'Event created!',
                'successfully',
                'success'
              ).then(function(){ 
                location.reload();
              });

            },
            ( error ) => {
            this.spinner.hide();

              swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
              })
              console.warn( "Error submitting application." );
              console.error( error );

            }
        )
    ;
  

}


public onUpdateEventsSubmit() : void {
  this.spinner.show();
  var Event_title = this.updateform.Event_title;
  var Event_description = this.updateform.Event_description;
  var Start_date = this.updateform.Start_date;
  var End_date = this.updateform.End_date;
  var Venue = this.updateform.Venue;
  var tickets_available = this.updateform.tickets_available;
  var Price = this.updateform.Price;
  var Event_id = this.updateform.Event_id;
  // Dealing with the files requires a tiny bit of elbow-grease. Since NgModel
  // won't automatically grab the files from the file-input, we have to use the
  // (changes) event to grab them manually. Then, we have to pluck the first
  // File Blob from the given FileList.
  var upload_pic = ( this.updateform.upload_pic && this.updateform.upload_pic )
      ? this.updateform.upload_pic[ 0 ]
      : null
  ;


  this.http
      .postUpdateEvent({
        Event_title: Event_title,
        Event_description: Event_description,
        Start_date: Start_date,
        End_date: End_date,
        Venue: Venue,
        tickets_available: tickets_available,
        Price: Price,
        Event_id: Event_id,
        upload_pic: upload_pic
      })
      .then(
          () => {
        this.spinner.hide();

            swal.fire(
              'Event Updated!',
              'successfully',
              'success'
            ).then(function(){ 
              location.reload();
            });

          },
          ( error ) => {
          this.spinner.hide();

            swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong!'
            })
            console.warn( "Error submitting application." );
            console.error( error );

          }
      )
  ;


}



  // onUpdateEventsSubmit(model:FormGroup){
  //   this.http.postUpdateEvent(model.value).subscribe( res => {
  //     swal.fire(
  //       res.message,
  //       'success'
  //     ).then(function(){
  //       location.reload();
  //     });
  //   },
  //   error => {
  //     swal.fire(
  //       'Failes!',
  //        error,
  //       'error'
  //     ).then(function(){
  //       location.reload();
  //     }); 
  //    });
  // }


  checkExistTitle(num){
    console.log(num);
    this.loadSpin = true;
    this.errorMsg = '';
    this.isAlreadyExistTitle = false;
    this.http.postSearchEvent(num.target.value).subscribe( response => {
      console.log(response);
      this.isAlreadyExistTitle = false;
        this.errorMsg = '';
        this.loadSpin = false;
      // if(response.status == false){
      //   this.isAlreadyExistTitle = true;
      //   this.errorMsg = 'Already Exist';
      //   this.loadSpin = false;
      // }else{
      //   this.isAlreadyExistTitle = false;
      //   this.errorMsg = '';
      //   this.loadSpin = false;
      // }
    },
    error => {
      if(error.status === 403){
        this.isAlreadyExistTitle = true;
        this.errorMsg = 'Already Exist';
        this.loadSpin = false;
      }
    })
  }

}
