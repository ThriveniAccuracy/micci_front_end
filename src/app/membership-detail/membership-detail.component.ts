import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import * as moment from 'moment';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';

@Component({
  selector: 'app-membership-detail',
  templateUrl: './membership-detail.component.html',
  styleUrls: ['./membership-detail.component.css']
})
export class MembershipDetailComponent implements OnInit {

  // public href: string = "";
  // membershipId;
  viewMembershipForm;
  membershipData;
  memberForm;
   shareholderList: any[] = [];
   primaryContactList: any[] = [];
   addon: string = '..';
   ssmFile;
   uBCardFile;
  constructor(private formBuilder: FormBuilder, private spinner:NgxSpinnerService,
    private router: Router, private adminService: AdminService,
    private activatedRoute: ActivatedRoute) {

    
}
  ngOnInit() {
    // console.log("routes");
    // console.log(this.activatedRoute.snapshot.url); // array of states
    console.log(this.activatedRoute.snapshot.url[1].path); 
    // this.membershipId = this.activatedRoute.snapshot.url[1].path;
    this.getMembershipDetails();
    this.getPrimaryContacts();
    this.getListOfShareholders();
    this.getMemberDetails();
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


    this.memberForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      mobile: [''],
      companyFax: [''],
      eMail: [''],
      branch: [''],
      number_of_years: [''],
      amount: [''],
      payment_status: [''],
      approval_date: [''],
      modifioed_by: [''],
      created_date: [''],
    });

  }

patchMembershipForm(patchData){
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
    // this.spinner.show();
    let membershipId = this.activatedRoute.snapshot.url[1].path;
    this.adminService.getByMembershipId( membershipId ).subscribe( response => {
         
        // console.log(response.data);
        this.patchMembershipForm(response.data);
    }, 
        error => {
          //   this.alertNotSuccess();            
        } );
  } 
  patchMemberForm(data){
     console.log(data);
     
  this.memberForm.patchValue({
    firstName: data[0].first_name,
    lastName: data[0].last_name,
    companyFax: data[0].company_fax,
    eMail: data[0].email,
    payment_status: data[0].payment_status,
    amount:data[0].amount,
    // payment_status: [''],
    // approval_date: [''],
    // modifioed_by: [''],
    // created_date: [''],
    // created_date: moment(data[0].created_date).utc().format('YYYY-MM-DD'),
    // approval_date: moment(data[0].approval_date).utc().format('YYYY-MM-DD'),

  });
  }

  getMemberDetails() {
    let membershipId = this.activatedRoute.snapshot.url[1].path;
    this.adminService.getMemberdetails( membershipId ).subscribe( response => {
         
        // console.log(response.data);
        this.patchMemberForm(response.data);
    }, 
        error => {
          //   this.alertNotSuccess();            
        } );
  } 


  getPrimaryContacts() {
    // this.spinner.show();
    this.primaryContactList = [];
    let membershipIdData = this.activatedRoute.snapshot.url[1].path;
    this.adminService.getPrimaryContactsByMembershipId( membershipIdData ).subscribe( response => {
         
        // console.log(response);
        if(response && response.data){
          this.primaryContactList =  response.data;
        }
    
    }, 
        error => {
          //   this.alertNotSuccess();            
        } );
  } 
  getListOfShareholders() {
    // this.spinner.show();
    this.shareholderList = [];
    let membershipIdVal = this.activatedRoute.snapshot.url[1].path;
    this.adminService.getListOfShareholdersByMembershipId( membershipIdVal ).subscribe( response => {
         
        // console.log(response);
        if(response && response.data){
          this.shareholderList =  response.data;
        }
    
    }, 
        error => {
          //   this.alertNotSuccess();            
        } );
  } 

  submitMemberForm(model: FormGroup){
    console.log(model.value);
    let membershipId = this.activatedRoute.snapshot.url[1].path;

    this.spinner.show();
    this.adminService.updateAdminMemberDetails( model.value, membershipId).subscribe( response => {
      // console.log(response);
      
      this.spinner.hide();
      swal.fire(
        'Success',
        'Membership Details Updated Successfully',
        'success'
      )
    })
  }

}
