import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Apps from '../config/app.sign';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private apiGetInvoiceList = Apps.baseUrl + 'user_invoice_details';
  private apiGetReceiptList = Apps.baseUrl + 'membership_receipt';
  private apiMemberInvoiceView = Apps.baseUrl + 'member_invoice_view';
  private apiMemberReceiptView = Apps.baseUrl + 'member_receipt_view';
  private apiUploadReceiptUser = Apps.baseUrl + 'user_upload_receipt';

  headers= new HttpHeaders({ 
    'Content-Type': 'application/json; charset=utf-8 '
  });
  options = { headers: this.headers };

  constructor(private httpService:HttpClient) { }

  
  getInvoiceList(): Observable<any> { 
    
      let requestData = {};
      requestData = { 
        user_id: JSON.parse(sessionStorage.getItem("userdata"))[0].user_id
     };  
      return this.httpService.post(this.apiGetInvoiceList, requestData);
    }
  
    
  getInvoiceData(invoiceNumber): Observable<any> { 
    
    let requestData = {};
    requestData = { 
      invoice_number: invoiceNumber
    };  
    return this.httpService.post(this.apiMemberInvoiceView, requestData);
  }
    
    
  getReceiptList(): Observable<any> { 
    
    let requestData = {};
    requestData = { 
      user_id: JSON.parse(sessionStorage.getItem("userdata"))[0].user_id
   };  
    return this.httpService.post(this.apiGetReceiptList, requestData);
  } 
      
  getReceiptDataView(receiptNumber): Observable<any> { 
    
    let requestData = {};
    requestData = { 
      receipt_number: receiptNumber
    };  
    return this.httpService.post(this.apiMemberReceiptView, requestData);
  }

  postUploadReceipt(data) : Observable<any> { 
    
    // let requestData = {};
    // requestData = { 
    //   receipt_number: receiptNumber
    // };  
    return this.httpService.post(this.apiUploadReceiptUser, data);
  }

}
