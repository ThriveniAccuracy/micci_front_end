import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Apps from '../config/app.sign';
import { Observable } from 'rxjs';
import * as moment from 'moment';


interface AddMicciForm {
    company_name: string,
    trade_name: string,
    branch: string,
    address1: string,
    address2: string,
    city: string,
    state: string,
    country: string,
    pincode:  string,
    company_tel: string,  
    company_fax: string,
    company_website: string,
    ma_address1: string,
    ma_address2: string,
    ma_state: string,
    ma_pincode: string,
    ma_country: string,    
    type_of_company: string,
    others: string,
    c_r_date: string,
    c_r_number: string,
    a_capital: string,
    i_capital: string,
    n_of_full_t_employees: string,
    y_m_category: string,
    d_o_principal_b_activities: string,
    business_sector: string,
    b_others: string,
    business_sub_sector: string,
    nationality: string,
    name: string,
    percentage: string,
    seconded_by: string,
    proposed_by: string,
    /*f_name: string,
    m_name: string,
    l_name: string,
    designation: string,*/
    email: string,
    mobile_no: string,
    m_company_tel: string,
    /*add_f_name: string,
    add_m_name: string,
    add_l_name: string,
    add_designation: string,
    add_email: string,*/
    ma_city: string,
    add_mobile_no: string,
    // add_company_tel: string, 
    b1_others: string,
    n_c_r_number: string, 
    // created_date: string,
    
    u_ssm_c_profile: FileList | null,
    u_b_card: FileList | null,
}

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  private apiMemberShipForm = Apps.baseUrl + 'member_apply';
  private apiMailApplicant = Apps.baseUrl + 'mail_to_applicant';
  private approvedMemberDetails = Apps.baseUrl + 'approved_member_details';
  private listOfShare = Apps.baseUrl + 'listofshare';
  private primaryContact = Apps.baseUrl + 'primarycontact';

  headers= new HttpHeaders({ 
    'Content-Type': 'application/json; charset=utf-8 '
  });
  options = { headers: this.headers };

  constructor(private httpService:HttpClient) { }

  addListOfShare(dataList): Observable<any> {  
    console.log(dataList)
    console.log(dataList.dataArray);
    console.log(dataList.dataArrayx);
    // let sharelistlength = dataList.dataArray.length
    let allsharelist = []
    let count = 0;
    let countx = 0;
    while (count < dataList.dataArray.length) {
        allsharelist.push(dataList.dataArray[count])
      count++
    }

    while (countx < dataList.dataArrayx.length ) {
        if(dataList.dataArrayx[countx].name.length > 0){

            allsharelist.push(dataList.dataArrayx[countx])
            countx++
        }
        else {
            countx ++
        }
    }

    console.log(allsharelist);
    
    let requestData = {};
    requestData = { 
         data: allsharelist,
         email: JSON.parse(sessionStorage.getItem("userdata"))[0].mail_id
   };      
    return this.httpService.post(this.listOfShare, requestData);
  }
  
  
  addPrimaryContacts(dataList): Observable<any> {  
      console.log(dataList);
    console.log(dataList.primaryDataArray);
    console.log(dataList.primaryDataArrayx);
    // let sharelistlength = dataList.dataArray.length
    let allprimarycontact = []
    let count = 0;
    let countx = 0;
    while (count < dataList.primaryDataArray.length) {
        allprimarycontact.push(dataList.primaryDataArray[count])
      count++
    }

    while (countx < dataList.primaryDataArrayx.length ) {
        if(dataList.primaryDataArrayx[countx].firstName.length > 0){

            allprimarycontact.push(dataList.primaryDataArrayx[countx])
            countx++
        }
        else {
            countx ++
        }
    }

    console.log(allprimarycontact);

    // console.log(dataList);
    
    let requestData = {};
    requestData = { 
         data: allprimarycontact,
         email: JSON.parse(sessionStorage.getItem("userdata"))[0].mail_id
   };      
    return this.httpService.post(this.primaryContact, requestData);
  }
  

  public async submitMemberShipForm( micciForm ) : Promise<void> {
    console.log(micciForm);
    var formData = new FormData();

    formData.append( "user_id", JSON.parse(sessionStorage.getItem("userdata"))[0].user_id );
    formData.append( "mail_id", JSON.parse(sessionStorage.getItem("userdata"))[0].mail_id );
    formData.append( "member_company_name", micciForm.company_name );
    formData.append( "member_trade_name", micciForm.trade_name );
    formData.append( "branch_name", micciForm.branch );
    formData.append( "address1", micciForm.address1 );    
    formData.append( "address2", micciForm.address2 );
    formData.append( "city", micciForm.city );
    formData.append( "member_state", micciForm.state );

    formData.append( "pincode", micciForm.pincode );
    formData.append( "country", micciForm.country );
    formData.append( "company_tel", micciForm.company_tel );

    formData.append( "company_fax", micciForm.company_fax );
    formData.append( "company_website", micciForm.company_website );
    formData.append( "ma_address1", micciForm.ma_address1 );
    formData.append( "ma_address2", micciForm.ma_address2 );
    formData.append( "ma_city", micciForm.ma_city );
    formData.append( "ma_state", micciForm.ma_state );
    formData.append( "ma_pincode", micciForm.ma_pincode );
    formData.append( "ma_country", micciForm.ma_country );
    formData.append( "type_of_company", micciForm.type_of_company );

    formData.append( "others", micciForm.others );
    formData.append( "c_r_date", moment(micciForm.c_r_date).format(("YYYY/MM/DD") ));
    formData.append( "c_r_number", micciForm.c_r_number );
    formData.append( "a_capital", micciForm.a_capital );
    formData.append( "i_capital", micciForm.i_capital );
    formData.append( "n_of_full_t_employees", micciForm.n_of_full_t_employees );
    formData.append( "y_m_category", micciForm.y_m_category );
    formData.append( "d_o_principal_b_activities", micciForm.d_o_principal_b_activities );

    formData.append( "business_sector", micciForm.business_sector );
    formData.append( "b_others", micciForm.b_others );
    formData.append( "business_sub_sector", micciForm.business_sub_sector );
    formData.append( "b1_others", micciForm.b1_others );
    
    formData.append( "seconded_by", micciForm.seconded_by );
    formData.append( "proposed_by", micciForm.proposed_by );

    formData.append( "n_c_r_number", micciForm.n_c_r_number );
    // formData.append( "created_date", micciForm.created_date );
    //  ,shareholder_name ,shareholder_nationality,shareholder_percentage ,
    //   ,primarycontact_firstname  ,primarycontact_middlename,primarycontact_lastname,primarycontact_Designation,primarycontact_mobileno,primarycontact_Email,primarycontact_companytell,

    ( micciForm.u_ssm_c_profile ) && formData.append( "u_ssm_c_profile", micciForm.u_ssm_c_profile );
    ( micciForm.u_b_card ) && formData.append( "u_b_card", micciForm.u_b_card );
    
    console.log(formData);
    
    var result = await this.httpService.post<void>(this.apiMemberShipForm,formData).toPromise();

}

/*public getClinics(){
  return this.http.get(this.apiUrlClinic);
}*/

submitAgree(): Observable<any> {  
  let requestData = {};
  requestData = { 
       mail_id: JSON.parse(sessionStorage.getItem("userdata"))[0].mail_id
 };      
  return this.httpService.post(this.apiMailApplicant, requestData);
}

getMemberships(): Observable<any> {  
  let requestData = {};
  requestData = { 
       membership_status: "Approved",
       email: JSON.parse(sessionStorage.getItem("userdata"))[0].mail_id
 };      
  return this.httpService.post(this.approvedMemberDetails, requestData);
}


}
