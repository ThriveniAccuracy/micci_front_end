import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import signup from '../config/app.sign';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignService {

  private apUrlPost = signup.baseUrl + 'signup';
  private apUrlPost1 = signup.baseUrl + 'signin';
  private apUrlPost2 = signup.baseUrl + 'insert_feedback';
  private apUrlGetProfile = signup.baseUrl + 'get_profile';
  private event_count = signup.baseUrl + 'event_count';
  private apUrlUpdateProfile = signup.baseUrl + 'edit_profile';
  private apiUrlUpdateProfilePhoto = signup.baseUrl + 'upload';
  // private apUrlForgotPassword = signup.baseUrl + 'forgot_password';
  private apUrlForgotPassword = signup.baseUrl + 'update_password';
  private apUrlMemberDetails = signup.baseUrl + 'membership_details';
  private apUrlInitiatePayment = signup.baseUrl + 'initial_pay';
  private apUrlApiBid = signup.baseUrl + 'bid';

  private apiSendToken = signup.baseUrl + 'Authentication';


  headers= new HttpHeaders({ 
    'Content-Type': 'application/json; charset=utf-8 '
  });
  options = { headers: this.headers };

  constructor(private httpService:HttpClient) { }


  apiBidPayment(data): Observable<any>{
    let requestData = {};
    requestData = {
        data: data,
        mail_id: JSON.parse(sessionStorage.getItem("userdata"))[0].mail_id,
        user_id: JSON.parse(sessionStorage.getItem("userdata"))[0].user_id,
        invoiceID: localStorage.getItem('activeinvoiceForPaymentt'),
        
    } 
    console.log(requestData);
    return this.httpService.post(this.apUrlApiBid, requestData);
  }

  apiBidPaymentExtEvents(data): Observable<any>{
      console.log(data);
    let requestData = {};
    requestData = {
        amount:data,
        mail_id: JSON.parse(sessionStorage.getItem("userdata"))[0].mail_id,
        user_id: JSON.parse(sessionStorage.getItem("userdata"))[0].user_id,

    } 
    console.log(requestData);
    
    return this.httpService.post(this.apUrlApiBid, requestData);
  }

  
  initiatePayment(formData): Observable<any>{
    
    let requestData = {};
    requestData = {
      user_id: JSON.parse(sessionStorage.getItem("userdata"))[0].user_id,
      first_name: JSON.parse(sessionStorage.getItem("userdata"))[0].first_name,
      last_name: JSON.parse(sessionStorage.getItem("userdata"))[0].last_name,
      mail_id: JSON.parse(sessionStorage.getItem("userdata"))[0].mail_id,
      contact_no: JSON.parse(sessionStorage.getItem("userdata"))[0].contact_no,
      amount: formData.amount,
      purpose: "membership"
    } 
    
    return this.httpService.post(this.apUrlInitiatePayment, requestData);
  }


  postMethod(formData): Observable<any>{
    
    let requestData = {};
    requestData = {
        first_name:formData.first_name,
        middle_name:formData.middle_name,
        last_name:formData.last_name,
        contact_no:formData.contact,
        mobile_no:formData.mobile,
        user_company_name:formData.companyName,
        designation:formData.designation,
        user_trade_name:formData.tradeName,
        mail_id:formData.email,
        user_state_name:formData.state,
        password:formData.password,
    //   user_type: "applicant"
    } 
    
    return this.httpService.post(this.apUrlPost, requestData);
  }


  postMethod1(formData): Observable<any>{
    
    let requestData = {};
    requestData = {
        mail_id:formData.email,
        password:formData.password
    } 
    
    return this.httpService.post(this.apUrlPost1, requestData);
  }

  feedBack(formData): Observable<any>{
    
    let requestData = {};
    requestData = {
        user_id:JSON.parse(sessionStorage.getItem("userdata"))[0].user_id,
      first_name: JSON.parse(sessionStorage.getItem("userdata"))[0].first_name,
      middle_name:(JSON.parse(sessionStorage.getItem("userdata"))[0].middle_name != '' ? JSON.parse(sessionStorage.getItem("userdata"))[0].middle_name : formData.middleName),
      last_name: JSON.parse(sessionStorage.getItem("userdata"))[0].last_name,
      company_name: JSON.parse(sessionStorage.getItem("userdata"))[0].user_company_name,
      comment:formData.comment
    } 
  
    return this.httpService.post(this.apUrlPost2, requestData);
  }

  getProfile(): Observable<any>{    
    let requestData = {};
    requestData = {     
        mail_id: JSON.parse(sessionStorage.getItem("userdata"))[0].mail_id        
    } 
    return this.httpService.post(this.apUrlGetProfile, requestData);
  }

  getEventCount(): Observable<any>{    
 
    return this.httpService.get(this.event_count);
  }

  getMemberDetails(): Observable<any>{    
    let requestData = {};
    requestData = {     
      mail_id: JSON.parse(sessionStorage.getItem("userdata"))[0].mail_id        
    } 
    return this.httpService.post(this.apUrlMemberDetails, requestData);
  }

  updateProfile(formData): Observable<any>{
    
    let requestData = {};
    requestData = {
      first_name:formData.FirstName1,         
      last_name:formData.LastName1,
      middle_name:formData.MiddleName1, 
      contact_no:formData.contact_number,
      mobile_no:formData.mobile_number,
      designation:formData.designation,
      company_name:formData.companyName,
      mail_id: JSON.parse(sessionStorage.getItem("userdata"))[0].mail_id
    } 
    
    return this.httpService.post(this.apUrlUpdateProfile, requestData);
  }

  updateProfilePhoto(formData): Observable<any>{
    
    let requestData = {};
    requestData = {
        Profile: formData.photo,
        mail_id: JSON.parse(sessionStorage.getItem("userdata"))[0].mail_id
    } 
    
    return this.httpService.post(this.apiUrlUpdateProfilePhoto, formData);
  }


  forgotPassword(formData): Observable<any>{
    
    let requestData = {};
    requestData = {
      mail_id: formData.Email5,
      password: formData.confirmPassword
    } 
    
    return this.httpService.post(this.apUrlForgotPassword, requestData);
  }

    postSendToken(data): Observable<any>{
        console.log(data);
        
        let requestData = {};
        requestData = {
            token : data
        } 
        
        return this.httpService.post(this.apiSendToken, requestData);
    }
}
