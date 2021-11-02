import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-detail-sby-id',
  templateUrl: './detail-sby-id.component.html',
  styleUrls: ['./detail-sby-id.component.css']
})
export class DetailSByIdComponent implements OnInit {

  viewMembershipForm;
  membershipData;
   shareholderList: any[] = [];
   primaryContactList: any[] = [];
   addon: string = '..';
   ssmFile;
   uBCardFile;
  constructor(private formBuilder: FormBuilder,
              private router: Router, private adminService: AdminService,
              private activatedRoute: ActivatedRoute,private spinner:NgxSpinnerService) {

    
}

ngOnInit() {
  // console.log("routes");
  // console.log(this.activatedRoute.snapshot.url); // array of states
  console.log(this.activatedRoute.snapshot.url[1].path); 
  // this.membershipId = this.activatedRoute.snapshot.url[1].path;
  this.getMembershipDetails();
  this.getPrimaryContacts();
  this.getListOfShareholders();
  this.viewMembershipForm = this.formBuilder.group({
    companyName: [''],
    tradeName: [''],
    address1: [''],
    address2:[''],
    city: [''],
    state: [''],
    postcode: [''],
    country:[''],
    company_tel: [''],
    company_fax: [''],
    company_website: [''],
    ma_address1: [''],
    ma_address2: [''],
    ma_city: [''],
    ma_pincode: [''],
    ma_state: [''],
    ma_country: [''],
    type_of_company: [''],
    c_r_date: [''],
    c_r_number: [''],
    n_c_r_number: [''],
    a_capital: [''],
    i_capital:[''],
    n_of_full_t_employees: [''],
    y_m_category: [''],

    d_o_principal_b_activities: [''],
    business_sector: [''],
    business_sub_sector: [''],
    proposed_by: [''],
    seconded_by: [''],
    // last_name: [doctorDetails.last_name, [Validators.required]],
    // gender: ["", [Validators.required]],
    
  });



}


patchMembershipForm(patchData){
    // this.spinner.show();
  // console.log(patchData);
  if(patchData[0].ma_country == "India"){
    this.addon = "+91";
  }else if(patchData[0].ma_country == "Malaysia"){
    this.addon = "+60";
  }else if(patchData[0].ma_country == "UK"){
    this.addon = "+44";
  }
  this.ssmFile = patchData[0].u_ssm_c_profile;
  this.uBCardFile = patchData[0].u_b_card;
  console.log(this.ssmFile);
  
  this.viewMembershipForm.patchValue({
    companyName: patchData[0].company_name,
    tradeName: patchData[0].trade_name,
    address1: patchData[0].address1,
    address2: patchData[0].address2,
    city: patchData[0].city,
    state: patchData[0].state,
    postcode: patchData[0].pincode,
    country: patchData[0].country,
    company_tel: patchData[0].company_tel,
    company_fax: patchData[0].company_fax,
    company_website: patchData[0].company_website,
    ma_address1: patchData[0].ma_address1,
    ma_address2: patchData[0].ma_address2,
    ma_city: patchData[0].ma_city,
    ma_pincode: patchData[0].ma_pincode,
    ma_state: patchData[0].ma_state,
    ma_country: patchData[0].ma_country,
    type_of_company: patchData[0].type_of_company,
    c_r_date: moment(patchData[0].c_r_date).utc().format('YYYY-MM-DD'),

      c_r_number: patchData[0].c_r_number,
      n_c_r_number: patchData[0].n_c_r_number,
      a_capital: patchData[0].a_capital,
      i_capital: patchData[0].i_capital,
      n_of_full_t_employees: patchData[0].n_of_full_t_employees,
      y_m_category: patchData[0].y_m_category,

      d_o_principal_b_activities: patchData[0].d_o_principal_b_activities,
      business_sector: patchData[0].business_sector,
      business_sub_sector: patchData[0].business_sub_sector,
      proposed_by: patchData[0].proposed_by,
      seconded_by: patchData[0].seconded_by,
  });
}

viewSsm(){
  window.open(this.ssmFile, "_blank");
}

viewBusinessCard(){
  window.open(this.uBCardFile, "_blank");
}

  getMembershipDetails() {
    this.spinner.show();
    let membershipId = this.activatedRoute.snapshot.url[1].path;
    this.adminService.getByMembershipId( membershipId ).subscribe( response => {
         
        // console.log(response.data);
        this.patchMembershipForm(response.data);
        this.spinner.hide();
    }, 
        error => {
          //   this.alertNotSuccess();            
        } );
  } 
 


  getPrimaryContacts() {
    this.spinner.show();
    this.primaryContactList = [];
    let membershipIdData = this.activatedRoute.snapshot.url[1].path;
    this.adminService.getPrimaryContactsByMembershipId( membershipIdData ).subscribe( response => {
         
        // console.log(response);
        if(response && response.data){
          this.primaryContactList =  response.data;
          this.spinner.hide();
        }
    
    }, 
        error => {
          //   this.alertNotSuccess();            
        } );
  } 
  getListOfShareholders() {
    this.spinner.show();
    this.shareholderList = [];
    let membershipIdVal = this.activatedRoute.snapshot.url[1].path;
    this.adminService.getListOfShareholdersByMembershipId( membershipIdVal ).subscribe( response => {
         
        // console.log(response);
        if(response && response.data){
          this.shareholderList =  response.data;
          this.spinner.hide();
        }
    
    }, 
        error => {
          //   this.alertNotSuccess();            
        } );
  } 

  

}


