import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Apps from '../config/app.sign';
import { Observable } from 'rxjs';
import * as moment from 'moment';


interface createEvent {
  Event_description: string;
  Start_date: string;
  End_date: string;
  Venue: string;
  tickets_available: string;
  Price: string;
  upload_pic: File | null;
  Event_title: string;
}

interface updateEvent {
  Event_title: string;
  Event_description: string;
  Start_date: string;
  End_date: string;
  Venue: string;
  tickets_available: string;
  Price: string;
  Event_id: string;
  upload_pic: File | null;
}
@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private apiCreateEvent = Apps.baseUrl + 'create_event';
  private apiViewEvent = Apps.baseUrl + 'view_event';
  private apiViewEventByAdmin = Apps.baseUrl + 'view_events_by_admin';
  private apiUpdateEvent = Apps.baseUrl + 'update_event';
  private apiDeleteEvent = Apps.baseUrl + 'delete_event';
  private apiBookedEvents = Apps.baseUrl + 'view_booking_by_admin';
  private apiSearchEvent = Apps.baseUrl + 'search_event';
  private apiExternalEvents = Apps.baseUrl + 'ext/exteral_booking';
  private apiEventAttendStatus = Apps.baseUrl + 'event_attend_status';

  private apiBookEvent = Apps.baseUrl + 'create_booking_info';

  headers= new HttpHeaders({ 
    'Content-Type': 'application/json; charset=utf-8 '
  });
  options = { headers: this.headers };

  constructor(private httpService:HttpClient) { }
  getEvents(){
    return this.httpService.get(this.apiViewEvent);
  }

  getEventsByAdmin(){
    return this.httpService.get(this.apiViewEventByAdmin);
  }

  getBookedEvents(){
    return this.httpService.get(this.apiBookedEvents);
  }

  // postEvent(formData):Observable<any>{
  //     let requestData = {};
  //     requestData = {
  //         Event_title:formData.eventTitle,
  //         Event_description:formData.description,
  //         Start_date:moment(formData.startDate).format("YYYY-MM-DD HH:mm:ss"),
  //         End_date:moment(formData.endDate).format("YYYY-MM-DD HH:mm:ss"),
  //         Venue:formData.venue,
  //         tickets_available:formData.availableTickets,
  //         Price:formData.price
  //     }
  //     console.log(requestData);
  //     return this.httpService.post(this.apiCreateEvent, requestData);
  // }

  public async postEvent( event: createEvent ) : Promise<void>{
    var formData = new FormData();

    // The FormData object provides a way to programmatically submit data that the
    // Browser could have natively submitted using a "<form/>" tag. Each entry here
    // represents a form-control field.
    
    formData.append( "Event_description", event.Event_description );
    formData.append( "Start_date", moment(event.Start_date).format("YYYY-MM-DD HH:mm:ss") );
    formData.append( "End_date", moment(event.End_date).format("YYYY-MM-DD HH:mm:ss") );
    formData.append( "Venue", event.Venue );
    formData.append( "tickets_available", event.tickets_available );
    formData.append( "Price", event.Price );
    
    // While the above values are "simple" values, we can add File Blobs to the
    // FormData in the exactly same way.
    // --
    // NOTE: An optional "filename" can be provided for Files. But, for this demo,
    // we're going to allow the native filename to be used for the uploads.
    ( event.upload_pic ) && formData.append( "upload_pic", event.upload_pic );
    formData.append( "Event_title", event.Event_title );
    var result = await this.httpService
        .post<void>(
          this.apiCreateEvent,
            formData

            // NOTE: When using a FormData instance to define the request BODY, the
            // correct Content-Type will be automatically provided, along with the
            // necessary "boundary" option that delimits the field values. If you
            // attempt to define the Content-Type explicitly, the "boundary" value
            // will be omitted from the post which will prevent the Lucee Server
            // parsing the request into the Form scope properly.
            // --
            // {
            // headers: {
            // "Content-Type": "multipart/form-data"
            // }
            // }
        )
        .toPromise()
    ;
}


public async postUpdateEvent( event: updateEvent ) : Promise<void>{
  var formData = new FormData();

  // The FormData object provides a way to programmatically submit data that the
  // Browser could have natively submitted using a "<form/>" tag. Each entry here
  // represents a form-control field.
  formData.append( "Event_title", event.Event_title );
  formData.append( "Event_description", event.Event_description );
  formData.append( "Start_date", moment(event.Start_date).format("YYYY-MM-DD HH:mm:ss") );
  formData.append( "End_date", moment(event.End_date).format("YYYY-MM-DD HH:mm:ss") );
  formData.append( "Venue", event.Venue );
  formData.append( "tickets_available", event.tickets_available );
  formData.append( "Price", event.Price );
  formData.append( "Event_id", event.Event_id );
  // While the above values are "simple" values, we can add File Blobs to the
  // FormData in the exactly same way.
  // --
  // NOTE: An optional "filename" can be provided for Files. But, for this demo,
  // we're going to allow the native filename to be used for the uploads.
  ( event.upload_pic ) && formData.append( "upload_pic", event.upload_pic );
  var result = await this.httpService
      .post<void>(
        this.apiUpdateEvent,
          formData

          // NOTE: When using a FormData instance to define the request BODY, the
          // correct Content-Type will be automatically provided, along with the
          // necessary "boundary" option that delimits the field values. If you
          // attempt to define the Content-Type explicitly, the "boundary" value
          // will be omitted from the post which will prevent the Lucee Server
          // parsing the request into the Form scope properly.
          // --
          // {
          // headers: {
          // "Content-Type": "multipart/form-data"
          // }
          // }
      )
      .toPromise()
  ;
}
//   postUpdateEvent(formData):Observable<any>{
//     let requestData = {};
//     requestData = {
//         Event_id:formData.eventId,
//         Event_title:formData.eventTitle1,
//         Event_description:formData.description1,
        
//         Start_date:moment(formData.startDate1).format("YYYY-MM-DD HH:mm:ss"),
       
//         End_date:moment(formData.endDate1).format("YYYY-MM-DD HH:mm:ss"),
//         Venue:formData.venue1,
//         tickets_available:formData.availableTickets1,
//         Price:formData.price1
//     }
//     console.log(requestData);
//     return this.httpService.post(this.apiUpdateEvent, requestData);
// }

postDeleteEvent(formData):Observable<any> {
  let requestData = {};
  requestData = {
    Event_title:formData.eventTitle
  }
  return this.httpService.post(this.apiDeleteEvent, requestData);
}

postSearchEvent(eventTitleSearch):Observable<any>{
  let requestData = {};
  requestData = {
    Event_title:eventTitleSearch
  }
  return this.httpService.post(this.apiSearchEvent, requestData);
}

postBookEvent(formData):Observable<any>{
  let requestData = {};
  requestData = {
    User_id:JSON.parse(sessionStorage.getItem("userdata"))[0].user_id,
    email:JSON.parse(sessionStorage.getItem("userdata"))[0].mail_id,
    no_of_tickets:formData.Tickets,
    price:formData.Price,
    event_name:formData.EventName,
    total_amount:formData.total
  }
  return this.httpService.post(this.apiBookEvent, requestData);
}

postExternalEvents(formData):Observable<any>{
  let requestData = {};
  requestData = {
    first_name: formData.first_name,
    last_name: formData.last_name,
    email_address: formData.email_address,
    company_name: formData.company_name,
    designation: formData.designation,
    mobile_no: formData.mobile_no,
    no_of_tickets: formData.no_of_tickets,
    amount: formData.total.toString(),
    event_name: formData.event_name
  }
  return this.httpService.post(this.apiExternalEvents, requestData);
}


getEventAttendStatus():Observable<any>{
  let requestData = {};
  requestData = {
    user_id:JSON.parse(sessionStorage.getItem("userdata"))[0].user_id,
  }
  return this.httpService.post(this.apiEventAttendStatus, requestData);
}
}
