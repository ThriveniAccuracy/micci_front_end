import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Apps from '../config/app.sign';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiGetAllMembershipList = Apps.baseUrl + 'member_details';
  private apiAdminLandingPageFilter = Apps.baseUrl + 'admin_landing_page_filter';

  private sendmessagetouser = Apps.baseUrl + 'sendmessagetouser';
  private apiGetFeedbackList = Apps.baseUrl + 'ad_get_feedbackdetails';
  private apiAdminCertFilter = Apps.baseUrl + 'admin_membership_cert_filter';
  private apiAdminStatusChange = Apps.baseUrl + 'application_status_by_admin';

  private apiGetMembership = Apps.baseUrl + 'member_details_admin';
  private apiGetPrimaryContacts = Apps.baseUrl + 'member_primarycontact_admin';
  private apiGetList0fShareholders = Apps.baseUrl + 'member_listofdetails_admin';
  private apiGetMemberDetails = Apps.baseUrl + 'member_details_by_admin';
  private apiUpdateAdminMemberDetails = Apps.baseUrl + 'membership_detail_edit_by_admin';
  private apiNotify = Apps.baseUrl + 'notify';
  private apiUnkown = 'http://www.datasciencetoolkit.org/maps/api/geocode/json?sensor=false&address=Munich';

  private apiGetNewUserList = Apps.baseUrl + 'admin_newapplicant';
  private apiGetUserView = Apps.baseUrl + 'view_user';

  private apiGetMemberView = Apps.baseUrl + 'member_view';
  private apiSentByAdmin = Apps.baseUrl + 'send_to_manager';
  private apiSentToAppover = Apps.baseUrl + 'send_to_approver';


  private apiGetAllManagerList = Apps.baseUrl + 'manager_landing_page';
  private apiGetAllApproverList = Apps.baseUrl + 'approver_landing_page';

  private apiReject = Apps.baseUrl + 'reject';
  private apiApprove = Apps.baseUrl + 'approved';
  private apiAppoverReject = Apps.baseUrl + 'approver_reject';
  private apiAppoverApprove = Apps.baseUrl + 'approver_approved';

  private apiNewuserMemberNotify = Apps.baseUrl + 'newuser_member_notification';

  private apiAdminGenerateInvoice = Apps.baseUrl + 'admin_generateInvoice';
   
  private apiManagerGenerateInvoice = Apps.baseUrl + 'manager_generateInvoice';
 private apiSendInvoiceToUser = Apps.baseUrl + 'send_to_user_invoice'; 
 private apiGetViewReceipt = Apps.baseUrl + 'view_invoice_receipt'; 

 private apiSendPaymentStatus = Apps.baseUrl + 'invoice_status';


 private apiInvoiceReject = Apps.baseUrl + 'reject_invoice';
 private apiInvoiceApprove = Apps.baseUrl + 'approve_invoice';
  headers= new HttpHeaders({ 
    'Content-Type': 'application/json; charset=utf-8 '
  });
  options = { headers: this.headers };

  constructor(private httpService:HttpClient) { }

public getUnknown(){
  return this.httpService.get(this.apiUnkown);
}

public getAllMembershipList(){
  return this.httpService.get(this.apiGetAllMembershipList);
}

public getFeedbackList(){
  return this.httpService.get(this.apiGetFeedbackList);
}


public getrecentMessages(event){

  let tableName = parseInt(event) + parseInt(JSON.parse(sessionStorage.getItem("usermembership"))[0]['membership_id'])
  return this.httpService.get( `${Apps.baseUrl}getusermessageDetaiils/${tableName}`);
  // return this.httpService.get();
  // console.log(tableName)
}



public sendMessageToPerson(formData): Observable<any>{
  console.log(formData)
  let reqstData = {}

  reqstData = { 
    //  created_date: created_date,
    messagedetails: formData.messagedetails,
    reciverId: formData.reciverId,
    senderId: formData.senderId
};      

  // return 
  return this.httpService.post(this.sendmessagetouser, reqstData);
}



adminLandingPageFilter(formData): Observable<any> { 
  console.log(formData.date);
  let created_date = '';
  if(formData.date != ''){
    
   created_date = moment(formData.date).local().format('YYYY-MM-DD');
  //  created_date = moment(formData.date).utc().format('YYYY-MM-DD');
  } else {
    created_date = '';
  }
    let requestData = {};
    requestData = { 
        //  created_date: created_date,
         membership_id: formData.membership_id,
         invoice_number: formData.invoice_no,
         receipt_number: formData.reciept_no,
         membership_cert_number: formData.mem_cer_no,
         city: formData.city,
         state: formData.state
   };      
    return this.httpService.post(this.apiAdminLandingPageFilter, requestData);
  }
  
  adminCertPageFilter(formData): Observable<any> { 
    
      let requestData = {};
      requestData = { 
           membership_id: formData.membership_id,
           membership_cert_number: formData.mem_cer_no
     };  
      return this.httpService.post(this.apiAdminCertFilter, requestData);
    }

    adminApplicationStatusChange(formData, membershipId): Observable<any> { 
    
      let requestData = {};
      requestData = { 
           membership_id: membershipId,
           application_status: formData.status
     };      
      return this.httpService.post(this.apiAdminStatusChange, requestData);
    }

    getByMembershipId(membershipId): Observable<any> { 
    
      let requestData = {};
      requestData = { 
           membership_id: membershipId
     };      
     
      return this.httpService.post(this.apiGetMembership, requestData);
    }
    getPrimaryContactsByMembershipId(membershipId): Observable<any> { 
    
      let requestData = {};
      requestData = { 
           membership_id: membershipId
     };    
      return this.httpService.post(this.apiGetPrimaryContacts, requestData);
    }
    getListOfShareholdersByMembershipId(membershipId): Observable<any> { 
    
      let requestData = {};
      requestData = { 
           membership_id: membershipId
     };  
      return this.httpService.post(this.apiGetList0fShareholders, requestData);
    }

    getMemberdetails(membershipId): Observable<any> { 
    
      let requestData = {};
      requestData = { 
           membership_id: membershipId
     };  
      return this.httpService.post(this.apiGetMemberDetails, requestData);
    }

    updateAdminMemberDetails(formData, membershipId): Observable<any> { 
      
        let requestData = {};
        requestData = { 
            //  f_name: moment(formData.date).utc().format('YYYY-MM-DD'),
             f_name: formData.firstName,
             l_name: formData.lastName,
             designation: formData.invoice_no,
             mobile_no: formData.mobile,
             company_fax: formData.companyFax,
             email: formData.eMail,
             branch: formData.branch,
             number_of_years: formData.number_of_years,
             amount: formData.amount,
             payment_status: formData.payment_status,
             approval_date: formData.approval_date,
             modifioed_by: formData.modifioed_by,
             created_date: formData.created_date,
             membership_id: membershipId,
       };      
        return this.httpService.post(this.apiUpdateAdminMemberDetails, requestData);
      }

    notify(formData, membershipId): Observable<any> { 
      
        let requestData = {};
        requestData = {
             membership_id: membershipId,
             topic: formData.topic,
             others: formData.others,
             content: formData.content.content[0].content[0].text
       };      
        return this.httpService.post(this.apiNotify, requestData);
    }

    public getNewUserList(){
        return this.httpService.get(this.apiGetNewUserList);
    }

    public getUserView(data): Observable<any> {
        console.log(data)
        let requestData = {};
        requestData = {
            user_id: data,
        }
        return this.httpService.post(this.apiGetUserView, requestData);
    }
    
    public getMembershipView(data): Observable<any> {
        console.log(data)
        let requestData = {};
        requestData = {
            membership_id: data,
        }
        return this.httpService.post(this.apiGetMemberView, requestData);
    }

    postSendbyadmin(formData): Observable<any> {
        let requestData = {};
        requestData = {
            membership_id: formData.member_id
        }
        return this.httpService.post(this.apiSentByAdmin, requestData);
    }

    postSendtoappover(formData): Observable<any> {
        console.log(formData);

        let requestData = {};
        requestData = {
            membership_id: formData.member_id
        }
        console.log(requestData);
        return this.httpService.post(this.apiSentToAppover, requestData);
    }

    public getAllManagerList(){
        return this.httpService.get(this.apiGetAllManagerList);
    }

    public getAllApproverList() {
        return this.httpService.get(this.apiGetAllApproverList);
    }

    // Membership Reject
  postMembershipReject(formData): Observable<any> {
    let requestData = {};
    requestData = {
        membership_id: formData.member_id
    }

    return this.httpService.post(this.apiReject, requestData);
  }

  // Membership Approve
  postMembershipApprove(formData): Observable<any> {
    let requestData = {};
    requestData = {
        membership_id: formData.member_id,
        remarks:formData.remarks
        //   Name: formData.admin_name
    }
    return this.httpService.post(this.apiApprove, requestData);
  }

   // Membership appover Reject
   postMembershipAppoverReject(formData): Observable<any> {
    let requestData = {};
    requestData = {
        membership_id: formData.member_id
    }

    return this.httpService.post(this.apiAppoverReject, requestData);
  }

  // Membership appover Approve
  postMembershipAppoverApprove(formData): Observable<any> {
    let requestData = {};
    requestData = {
        membership_id: formData.member_id,
        remarks:formData.remarks
        //   Name: formData.admin_name
    }
    return this.httpService.post(this.apiAppoverApprove, requestData);
  }

  postInvoiceReject(formData): Observable<any> {
    let requestData = {};
    requestData = {
        userId: formData.user_id,
        Remarks:formData.remarks
    }
    return this.httpService.post(this.apiInvoiceReject, requestData);
  }

  postInvoiceApprove(formData): Observable<any> {
    let requestData = {};
    requestData = {
        userId: formData.user_id,
    }
    return this.httpService.post(this.apiInvoiceApprove, requestData);
  }

  postMemberNotify(data): Observable<any> {
      console.log(data);
    let requestData = {};
    requestData = {
        user_id: data,
    }
    console.log(requestData);
    return this.httpService.post(this.apiNewuserMemberNotify, requestData);
  }

    postGenerateInvoice(data): Observable<any> {
        console.log(data);
    //   let requestData = {};
    //   requestData = {
    //       user_id: data,
    //   }
    //   console.log(requestData);
    return this.httpService.post(this.apiAdminGenerateInvoice, data);
    }

    postSendGenerateInvoice(data): Observable<any> {
        console.log(data);
        let requestData = {};
      requestData = {
          user_id: data,
      }
      console.log(requestData);

        return this.httpService.post(this.apiManagerGenerateInvoice, requestData);
    }

    postSendInvoiceToUser(data): Observable<any> {
        console.log(data);
    //     let requestData = {};
    //         requestData = {
    //         user_id: data,
    //   }
    //   console.log(requestData);

        return this.httpService.post(this.apiSendInvoiceToUser, data);
    }

    getViewReceipt(data) {

            let requestData = {};
            requestData = {
            user_id: data,
      }
      console.log(requestData);

        return this.httpService.post(this.apiGetViewReceipt, requestData);
    }

    postSendPaymentStatus(data) {
        console.log(data);
        return this.httpService.post(this.apiSendPaymentStatus, data);
    }
}
