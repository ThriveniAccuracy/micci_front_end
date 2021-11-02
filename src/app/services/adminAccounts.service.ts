import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Apps from '../config/app.sign';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AdminAccountsService {

  private apiAccountStatment = Apps.baseUrl + 'admin_statement_Account';
  private apiMembershipReceipt = Apps.baseUrl + 'membership_receipt_filter';
  private apiRequestInvoice = Apps.baseUrl + 'request_invoice_filter';
  private apiAdminRenewalForm = Apps.baseUrl + 'admin_renewal_notice_filter';
  private apiMembershipInvoice = Apps.baseUrl + 'membership_invoice_filter';
  private apiAdminGenerateReceiptSubmit = Apps.baseUrl + 'admin_generate_receipt';
  private apiGenerateRenewalInvoiceSubmit = Apps.baseUrl + 'admin_generate_renewal_notice_id';
  private apiGenerateInvoice = Apps.baseUrl + 'admin_invoice_generate';

  

  headers= new HttpHeaders({ 
    'Content-Type': 'application/json; charset=utf-8 '
  });
  options = { headers: this.headers };

  constructor(private httpService:HttpClient) { }

  getAccountStatement(formData): Observable<any> { 
    
    let requestData = {};
    requestData = { 
      membership_id:formData.membershipId,
      receipt_number:formData.receiptNumber,
      invoice_number:formData.invoiceNumber
    };
    // console.log(requestData);
      
    return this.httpService.post(this.apiAccountStatment, requestData);
  }

  getMembershipAccount(formData): Observable<any> { 
    
    let requestData = {};
    requestData = { 
      membership_id:formData.membershipId1,
      receipt_number:formData.receiptNumber
    };
    // console.log(requestData);
      
    return this.httpService.post(this.apiMembershipReceipt, requestData);
  }

  getRequestInvoiceFilter(formData): Observable<any> { 
    
    let requestData = {};
    requestData = { 
      membership_id:formData.membershipId2,
      company_name:formData.companyName
    };
    // console.log(requestData);
      
    return this.httpService.post(this.apiRequestInvoice, requestData);
  }

  getProofOfPayment(formData): Observable<any> { 
    
    let requestData = {};
    requestData = { 
      membership_id:formData.membershipId3,
      company_name:formData.companyName2
    };
    // console.log(requestData);
      
    return this.httpService.post(this.apiRequestInvoice, requestData);
  }

  getAdminRenewalForm(formData): Observable<any> { 
    
    let requestData = {};
    requestData = { 
      membership_id:formData.renewalId,
    };
    // console.log(requestData);
      
    return this.httpService.post(this.apiAdminRenewalForm, requestData);
  }

  getMembershipInvoiceFilter(formData): Observable<any> { 
      
    let requestData = {};
    requestData = { 
      membership_id: formData.membershipId4,
      invoice_number: formData.invoice_num
    };
    console.log(requestData);
      
    return this.httpService.post(this.apiMembershipInvoice, requestData);
  }
  
  postAdminGenerateSubmit(formData):Observable<any> { 
    
    let requestData = {};
    requestData = { 
      membership_id:formData.membership_id,
      invoice_no:formData.invoice_no,
    //   company_name:formData.company_name,
      payment_method:formData.payment_method,
    //   payment_particulars:formData.particulars,
      r_amount:formData.amount,
    //   others:(formData.others != '' ? formData.others : null)
    };
    console.log(requestData);
      
    return this.httpService.post(this.apiAdminGenerateReceiptSubmit, requestData);
  }

  postGenerateRenewalNotice(formData):Observable<any> { 
    
    let requestData = {};
    requestData = { 
        //   company_name:formData.company_name,
        //   name:formData.name,
        //   others:formData.others,
          amount:formData.amount,
          membership_id:formData.membership_id
    };
  //   console.log(requestData);
      
    return this.httpService.post(this.apiGenerateRenewalInvoiceSubmit, requestData);
  }

  postGenerateInvoice(formData):Observable<any> { 
    
    let requestData = {};
    requestData = { 
          company_name:formData.company_name,
          name:formData.name,
          others:formData.others,
          amount:formData.amount,
          membership_id:formData.membership_id
    };
  //   console.log(requestData);
      
    return this.httpService.post(this.apiGenerateInvoice, requestData);
  }

}
