import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import signup from '../config/app.sign';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FormService {

  private membershipForm = signup.baseUrl + 'signup';
  private renewalNotice = signup.baseUrl + 'renewal_notice';
  private renwalNoticeView = signup.baseUrl + 'renewal_notice_view';
  private apiGetCompanyAddress = signup.baseUrl + 'get_company_address';

  headers= new HttpHeaders({ 
    'Content-Type': 'application/json; charset=utf-8 '
  });
  options = { headers: this.headers };


  constructor(private httpService:HttpClient) { }

  public getCompanyAddress(){
    return this.httpService.get(this.apiGetCompanyAddress);
  }

  membershipFormPost(formData): Observable<any>{
    console.log(formData);
    let requestData = {};
    requestData = {
      company_name:formData.companyName,
      trade_name:formData.tradeName,
      address1:formData.Address11,
      address2:formData.Address12,
      city:formData.Address13,
      state:formData.Address14,
      pincode:formData.Address15,
      country:formData.Address16,
      company_tel:formData.companyTel1,
      company_fax:formData.companyFax,
      company_website:formData.companyWebsite,
      ma_address1:formData.Address1,
      ma_address2:formData.Address2,
      ma_city:formData.Address3,
      ma_state:formData.Address4,
      ma_pincode:formData.Address5,
      ma_country:formData.Address6,
      type_of_company:formData.type_of_company,
      others:formData.others,
      c_r_date:formData.Date,
      c_r_number:formData.Number2,
      n_c_r_number:formData.Number3,

      a_capital:formData.authorizedCapital,
      i_capital:formData.issuedCapital,
      n_of_full_t_employees:formData.Employees,
      y_m_category:formData. category,
      d_o_principal_b_activities:formData.Activities,
      business_sector:formData.business_sector,
      b_others:formData.others1,
      business_sub_sector:formData.business_sub_sector,
      b1_others:formData.others2,

      nationality:formData.Nationality,
      name:formData.Name2,
      percentage:formData.equityHolding,

      seconded_by:formData.Name1,
      proposed_by:formData.Name,

      f_name:formData.FirstName1,
      m_name:formData.MiddleName1,
      l_name:formData.LastName1,
      designation:formData.Designation,
      email:formData.Email2,
      mobile_no:formData.mobileNo,
      m_company_tel:formData.companyTel,

      add_f_name:formData.firstName3,
      add_m_name:formData.middleName3,
      add_l_name:formData.lastName3,
      add_designation:formData. Designation3,
      add_email:formData.email4,
      add_mobile_no:formData.mobileNo3,
      add_company_tel:formData.companyTel3,

      u_ssm_c_profile:formData.u_ssm_c_profile,
      u_b_card:formData.u_b_card,
      
} 
    console.log(requestData);
    return this.httpService.post(this.membershipForm, requestData);
  }
  getRenewalNoticeData():Observable<any> {
    let requestData;
    requestData = {
      email: JSON.parse(sessionStorage.getItem("userdata"))[0].mail_id
    }
    console.log(requestData);
    return this.httpService.post(this.renewalNotice, requestData);
  }

  renewalNoticeView(noticeId):Observable<any>{
    let requestData;
    requestData = {
      notice_id:noticeId
    }
     return this.httpService.post(this.renwalNoticeView, requestData);
  }

}
