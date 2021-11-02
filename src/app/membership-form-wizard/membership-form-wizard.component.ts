import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { WizardComponent, WizardStepComponent } from '../themes/angularWizard';
import { FormService } from '../services/form.service';
import { MembershipService } from '../services/membership.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import { addMore } from './addmore.model';
import { addPrimary } from './addprimary.model';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';
import { SignService } from '../services/sign.service';


@Component({
  selector: 'app-membership-form-wizard',
  templateUrl: './membership-form-wizard.component.html',
  styleUrls: ['./membership-form-wizard.component.css']
})
export class MembershipFormWizardComponent implements OnInit {

  @ViewChild('autoShownModal', { static: false }) autoShownModal: ModalDirective;
  isModalShown = false;

  display='none';
  addMore = new addMore();
  addPrimary = new addPrimary();
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
//   dataArray = [];
//   primaryDataArray = [];
  Name:any;
  Nationality:any;
  Percentage:any;

  CompanyTel:any;
  MobileNo:any;
  Email:any;
  Designation:any;
  LastName:any;
  MiddleName:any;
  FirstName:any;

  public form: {
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
    // nationality: string,
    // name: string,
    // percentage: string,
    seconded_by: string,
    proposed_by: string,
    ma_city: string,
   
    b1_others: string,
    n_c_r_number: string, 
    // created_date: string,
    
    u_ssm_c_profile: FileList | null,
    u_b_card: FileList | null,
    
  }

  otherInput: boolean = false;
  otherInput1: boolean = false;
  otherInput2: boolean = false;
  otherInput3: boolean = false;
  addon: string = '..';
  addon1: string = '..';
  amount : string = '';
  // display = "none";
  membership: FormGroup;
 
  
  head=['Membership Category','Criteria of Qualification','Annual Subscription'];

  constructor(private builder: FormBuilder, private spinner:NgxSpinnerService,
    private membershipService: MembershipService,private profileService: SignService,
    private router: Router) { 

      this.form = {  
        company_name: "",
        trade_name: "",
        branch: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        country: "",
        pincode:  "",
        company_tel: "",  
        company_fax: "",
        company_website: "",
        ma_address1: "",
        ma_address2: "",
        ma_state: "",
        ma_city: "",
        ma_pincode: "",
        ma_country: "",    
        type_of_company: "",
        others: "",
        c_r_date: "",
        c_r_number: "",
        a_capital: "",
        i_capital: "",
        n_of_full_t_employees: "",
        y_m_category: "",
        d_o_principal_b_activities: "",
        business_sector: "",
        b_others: "",
        business_sub_sector: "",
        // nationality: "",
        // name: "",
        // percentage: "",
        seconded_by: "",
        proposed_by: "",
        b1_others: "",
        n_c_r_number: "", 
        // created_date: "",
        
        u_ssm_c_profile: null,
        u_b_card: null,

      };

    
    }


  onStep1Next(event) {

  }
  onStep2Next(event) {

  }
  onStep3Next(event) {

  }
  onStepChanged(step: WizardStepComponent) {

  }
  
  
  ngOnInit() {
    // this.showModal();
    this.patchProfileForm();

    var content = document.getElementsByClassName("card-footer");
    var kbButtons = content[0].getElementsByTagName("button");
    console.log(content);
    console.log(kbButtons);
    kbButtons[2].style.display = "none";

/*for (var iIndex = 0; iIndex < kbButtons.length; iIndex++){
    alert(kbButtons[iIndex].id);
};*/

this.secondFormGroup = this.builder.group({
    dataArray: this.builder.array([
    this.builder.group({
        name: ['', [Validators.required]],
        nationality: ['', [Validators.required]],
        percentage: ['', [Validators.required]],      
    }),
  ]),
  dataArrayx: this.builder.array([
    this.builder.group({
        name: [''],
        nationality: [''],
        percentage: [''],
    }),
  ]),
});

this.thirdFormGroup = this.builder.group({
    primaryDataArray: this.builder.array([
    this.builder.group({
        firstName: ['', [Validators.required]],
       middleName: [''],
       lastName: ['', [Validators.required]],
       designation: [''],
       email: ['', [Validators.required, Validators.email]],
       mobileNo: ['', [Validators.required,Validators.minLength(10)]],
       companyTel: ['', [Validators.required]]      
    }),
  ]),
  primaryDataArrayx: this.builder.array([
    this.builder.group({
        firstName: [''],
        middleName: [''],
        lastName: [''],
        designation: [''],
        email: [''],
        mobileNo: [''],
        companyTel: ['']  
    }),
  ]),
});

//     this.addMore = new addMore();
//    this.dataArray.push(this.addMore); 
//    this.addPrimary = new addPrimary(); 
//    this.primaryDataArray.push(this.addPrimary);
    }


    get dataArray() {
        return this.secondFormGroup.get('dataArray') as FormArray;
      }
      get dataArrayx() {
        return this.secondFormGroup.get('dataArrayx') as FormArray;
      }
      add() {
        this.dataArrayx.push(this.builder.group({
          name: new FormControl(""),
        nationality: new FormControl(""),
        percentage: new FormControl(""),
        }));
        // console.log(this.dataArrayx.value);
      }
      remove(index) {
        this.dataArrayx.removeAt(index);
      }

      get primaryDataArray() {
        return this.thirdFormGroup.get('primaryDataArray') as FormArray;
      }
      get primaryDataArrayx() {
        return this.thirdFormGroup.get('primaryDataArrayx') as FormArray;
      }
      addPrimaryBtn() {
        this.primaryDataArrayx.push(this.builder.group({
            firstName: new FormControl(""),
            middleName: new FormControl(""),
            lastName: new FormControl(""),
            designation: new FormControl(""),
            email: new FormControl(""),
            mobileNo: new FormControl(""),
            companyTel: new FormControl(""), 
        }));
        console.log(this.primaryDataArrayx.value);
      }
      removePrimaryContacts(index) {
        this.primaryDataArrayx.removeAt(index);
      }

    showModal() {
      this.isModalShown = true;
    }
   
    hideModal(): void {
      this.autoShownModal.hide();
    }
   
    
    category(event){
      console.log(event);
      this.amount = '';
   if(event == "Premier"){
     this.amount = "RM 40,000 ";
   }else if(event == "Ordinary A"){
     this.amount = "RM 3,600.00";
   }else if(event == "Ordinary B"){
     this.amount = "RM 2,680.00";
   }else if(event == "Ordinary C"){
     this.amount = "RM 1,960.00";
   }else if(event == "Ordinary D"){
     this.amount = "RM 1,350.00";
   }else if(event == "Associate"){
     this.amount = "RM 1,300.00";
   }else {
     this.amount = '';
   }
   }
   
reload(){
 location.reload()
}

//    add(){
//      this.addMore = new addMore();
//      this.dataArray.push(this.addMore);
//   }

//   addPrimaryBtn(){
//    this.addPrimary = new addPrimary();
//    this.primaryDataArray.push(this.addPrimary);
// }

  addMoreSubmit(model: FormGroup){
   console.log(model.value);
   this.membershipService.addListOfShare(model.value).subscribe( response => {
     console.log(response);
     swal.fire(
       'success!',
       'Shareholders Added Successfully',
       'success'
     ).then(function(){ 
       // location.reload();
     });
     
   })
}

addPrimaryContactSubmit(model: FormGroup){
 console.log(model.value);
 this.membershipService.addPrimaryContacts(model.value).subscribe( response => {
   console.log(response);
   swal.fire(
     'success!',
     'Primary Contacts Added Successfully',
     'success'
   ).then(function(){ 
     // location.reload();
   });
   
 })
}
// remove(index){
//   this.dataArray.splice(index);
// }   
// removePrimaryContacts(index){
//  this.primaryDataArray.splice(index);
// }

   

   // get f() { return this.membership.controls; }
   typeOthers(event){
       console.log(event)
       if(event == "Others"){
         this.otherInput = true;
       } else {
         this.otherInput = false;
       }
}

   typeOthers1(event){
     console.log(event)
     if(event == "Others1"){
       this.otherInput1 = true;
     } else {
       this.otherInput1 = false;
     }

 }
   typeOthers2(event){
     console.log(event)
     if(event == "Others2"){
       this.otherInput2 = true;
     } else {
       this.otherInput2 = false;
     }

 }

 changeCountry(value){
   console.log(value)
   this.addon = '';
   if(value == "India"){
     this.addon = "+91";
   }else if(value == "Malaysia"){
     this.addon = "+60";
   }else if(value == "UK"){
     this.addon = "+44";
   }else if(value == "Singapore"){
    this.addon = "+65";
  }
 }
 changeCountry1(value){
   console.log(value)
   this.addon1 = value;
 }

 onFileSelected(event){
   console.log(event)
 }
 onFileSelected1(event){
   console.log(event)
 }
  
 /*
 sweetalertclick(){
    Swal.fire({
     icon: 'success',
     title: 'Form Submitted',
     text: 'Check your email for Email Validation',
     showConfirmButton: true

    }).then(function(){
       location.reload();
    });
 } 
 */
 

public submitMembershipForm() : void {
 var company_name = this.form.company_name;
 var trade_name = this.form.trade_name;
 var branch = this.form.branch;
 var address1 = this.form.address1;
 var address2 = this.form.address2;
 var city = this.form.city;
 var state = this.form.state;
 var country = this.form.country;
 var pincode = this.form.pincode;
 var company_tel = this.form.company_tel;
 var company_fax = this.form.company_fax;
 var company_website = this.form.company_website;
 var ma_address1 = this.form.ma_address1;
 var ma_address2 = this.form.ma_address2;
 var ma_state = this.form.ma_state;
 var ma_pincode = this.form.ma_pincode;
 var ma_country = this.form.ma_country;  
 var type_of_company = this.form.type_of_company;
 var others = this.form.others;
 var c_r_date = this.form.c_r_date;
 var c_r_number = this.form.c_r_number;
 var a_capital = this.form.a_capital;
 var i_capital = this.form.i_capital;
 var n_of_full_t_employees = this.form.n_of_full_t_employees;
 var y_m_category = this.form.y_m_category;
 var d_o_principal_b_activities = this.form.d_o_principal_b_activities;
 var business_sector = this.form.business_sector;
 var b_others = this.form.b_others;
 var business_sub_sector = this.form.business_sub_sector;
//  var nationality = this.form.nationality;
//  var name = this.form.name;
//  var percentage = this.form.percentage;
 var seconded_by = this.form.seconded_by;
 var proposed_by = this.form.proposed_by;
 /*var f_name = this.form.f_name;
 var m_name = this.form.m_name;
 var l_name = this.form.l_name;
 var designation = this.form.designation;
 var email = this.form.email;
 var mobile_no = this.form.mobile_no;
 var m_company_tel = this.form.m_company_tel;
 var add_f_name = this.form.add_f_name;
 var add_m_name = this.form.add_m_name;
 var add_l_name = this.form.add_l_name;
 var add_designation = this.form.add_designation;
 var add_email = this.form.add_email;*/
 var ma_city = this.form.ma_city;
 // var add_mobile_no = this.form.add_mobile_no;
 // var add_company_tel = this.form.add_company_tel;
 var b1_others = this.form.b1_others;
 var n_c_r_number = this.form.n_c_r_number;
 // var created_date = this.form.created_date;
 
 var u_ssm_c_profile = (this.form.u_ssm_c_profile && this.form.u_ssm_c_profile.length)
 ? this.form.u_ssm_c_profile[0]
 : null;

var u_b_card = (this.form.u_b_card && this.form.u_b_card.length)
 ? this.form.u_b_card[0]
 : null;
 console.log(a_capital);
 console.log(i_capital);
 console.log(business_sector);
 console.log(business_sub_sector);
 console.log(n_of_full_t_employees);
 console.log(type_of_company);

 console.log(u_ssm_c_profile);
 console.log(u_b_card);
 if(company_name == ''){
   this.myAlert('Company Name');
 } else if(address1 == ''){
   this.myAlert('Address1');
 } else if(address2 == ''){
   this.myAlert('Address2');
 } else if(city == ''){
   this.myAlert('City');
 } else if(pincode == ''){
   this.myAlert('Pincode');
 } else if(state == ''){
   this.myAlert('State');
 } else if(country == ''){
   this.myAlert('Country');
 } else if(company_tel == ''){
   this.myAlert('Company Tel');
 } else if(c_r_date == ''){
   this.myAlert('Company Registration Date');
 } else if(c_r_number == ''){
   this.myAlert('Company Registration Number');
 } else if(a_capital == ''){
   this.myAlert('Authorized Capital');
 } else if(i_capital == ''){
   this.myAlert('Issued Capital');
 } else if(business_sector == ''){
   this.myAlert('Business Sector');
 } else if(business_sub_sector == ''){
   this.myAlert('Business Sub-Sector');
 } else if(n_of_full_t_employees == ''){
   this.myAlert('Number of Full-Time Employees');
 } else if(type_of_company == ''){
   this.myAlert(' Type Of Company');
 } else if(u_ssm_c_profile == null){
   this.myAlert('Upload SSM');
 } else if(u_b_card == null){
   this.myAlert('Upload Business Card');
 } else {
 this.spinner.show();
 this.membershipService.submitMemberShipForm ({
     company_name: company_name,
     trade_name: trade_name,
     branch: branch,
     address1: address1,
     address2: address2,
     city: city,
     state: state,
     pincode: pincode,
     country: country,

     company_tel: company_tel,
     company_fax:  company_fax,
     company_website: company_website,  
     ma_address1: ma_address1,
     ma_address2: ma_address2,
     ma_state: ma_state,
     ma_pincode: ma_pincode,
     ma_country: ma_country,
     type_of_company: type_of_company,
     
     others: others,
     c_r_date: c_r_date,
     c_r_number: c_r_number,
     a_capital: a_capital,
     i_capital: i_capital,
     n_of_full_t_employees: n_of_full_t_employees,

     y_m_category: y_m_category,
     d_o_principal_b_activities: d_o_principal_b_activities,
     business_sector: business_sector,
     b_others: b_others,
     business_sub_sector: business_sub_sector,
    //  nationality: nationality,
    //  name: name,
    //  percentage: percentage,
     seconded_by: seconded_by,
     proposed_by: proposed_by,
    /* f_name: f_name,
     m_name: m_name,
     l_name: l_name,
     designation: designation,
     email: email,
     mobile_no: mobile_no,
     m_company_tel: m_company_tel,
     add_f_name: add_f_name,
     add_m_name: add_m_name,
     add_l_name: add_l_name,
     add_designation: add_designation,
     add_email: add_email,*/
     ma_city: ma_city,
     // add_mobile_no: add_mobile_no,
     // add_company_tel: add_company_tel,
     b1_others: b1_others,
     n_c_r_number: n_c_r_number,
     // created_date: created_date,

     u_ssm_c_profile: u_ssm_c_profile,
     u_b_card: u_b_card,
     
   })
   .then(
     (res ) => {
         console.log(res);
         // alert( 'MICCI Form Added Successully' );
       let message = 'MICCI Form Added Successully';
           // this.router.navigate(['home']);
           this.spinner.hide();
           /*swal.fire(
             'success!',
             'MICCI Form Added Successully',
             'success'
           ).then(function(){ 
             this.router.navigate(['adree-disagree']);
           });*/
           swal.fire(
             'Success',
             'Membership Successfully Completed',
             'success'
           )
           this.router.navigate(['adree-disagree']);
     },
     ( error ) => {

       alert( "Something went wrong with the form-submission." );
       console.warn( "Error submitting membership application." );
       console.log(error);
       console.error( error );

     }
   )
 ;

}
}

myAlert(message) {
 /*swal.fire(
     title: 'Alert!',
     type: 'info',
     text: "Check " + message + ' Field'
  );*/
  swal.fire(
   'Alert!',
   "Check " + message + ' Field',
   'error'
 )
}
 
patchProfileForm(){
    this.spinner.show();
    this.profileService.getProfile().subscribe( response => {
      console.log(response['data'][0]);
    //   this.profile.controls['Email2'].patchValue(this.email);
      this.form = {  
        company_name : response['data'][0].member_company_name,
        trade_name: response['data'][0].member_trade_name,
        branch: response['data'][0].branch_name,
        address1: response['data'][0].address1,
        address2: response['data'][0].address2,
        city: response['data'][0].city,
        state: response['data'][0].member_state,
        country: response['data'][0].country,
        pincode:  response['data'][0].pincode,
        company_tel: response['data'][0].company_tel,  
        company_fax: response['data'][0].company_fax,
        company_website: response['data'][0].company_website,
        ma_address1: response['data'][0].ma_address1,
        ma_address2: response['data'][0].ma_address2,
        ma_state: response['data'][0].ma_state,
        ma_city: response['data'][0].ma_city,
        ma_pincode: response['data'][0].ma_pincode,
        ma_country: response['data'][0].ma_country,
        type_of_company: response['data'][0].type_of_company,
        c_r_date: response['data'][0].c_r_date,
        c_r_number: response['data'][0].c_r_number,
        a_capital: response['data'][0].a_capital,
        i_capital: response['data'][0].i_capital,
        n_of_full_t_employees: response['data'][0].n_of_full_t_employees,
        y_m_category: response['data'][0].y_m_category,
        d_o_principal_b_activities: response['data'][0].d_o_principal_b_activities,
        business_sector: response['data'][0].business_sector,
        b_others: response['data'][0].b_others,
        business_sub_sector: response['data'][0].business_sub_sector,
        seconded_by: response['data'][0].seconded_by,
        proposed_by: response['data'][0].proposed_by,
        n_c_r_number: response['data'][0].n_c_r_number,
        
        others: response['data'][0].others,
        b1_others: response['data'][0].b1_others,
        // created_date: '',
        // nationality: '',
        // name: '',
        // percentage: '',
        u_ssm_c_profile: null,
        u_b_card: null,

      };


      var shareholder_name = response['data'][0].shareholder_name ? response['data'][0].shareholder_name.split(',') : " ";
      this.Name = shareholder_name[0];
      var shareholder_nationality = response['data'][0].shareholder_nationality ? response['data'][0].shareholder_nationality.split(',') : " ";
      this.Nationality = shareholder_nationality[0];
      var shareholder_percentage = response['data'][0].shareholder_percentage ? response['data'][0].shareholder_percentage.split(',') : " ";
      this.Percentage = shareholder_percentage[0];


      var primarycontact_firstname = response['data'][0].primarycontact_firstname ? response['data'][0].primarycontact_firstname.split(',') : " ";
      this.FirstName = primarycontact_firstname[0];
      var primarycontact_middlename = response['data'][0].primarycontact_middlename ? response['data'][0].primarycontact_middlename.split(',') : " ";
      this.MiddleName = primarycontact_middlename[0];
      var primarycontact_lastname = response['data'][0].primarycontact_lastname ? response['data'][0].primarycontact_lastname.split(',') : " ";
      this.LastName = primarycontact_lastname[0];
      var primarycontact_designation = response['data'][0].primarycontact_designation ? response['data'][0].primarycontact_designation.split(',') : " ";
      this.Designation = primarycontact_designation[0];
      var primarycontact_email = response['data'][0].primarycontact_email ? response['data'][0].primarycontact_email.split(',') : " ";
      this.Email = primarycontact_email[0];
      var primarycontact_mobileno = response['data'][0].primarycontact_mobileno ? response['data'][0].primarycontact_mobileno.split(',') : " ";
      this.MobileNo = primarycontact_mobileno[0];
      var primarycontact_companytell = response['data'][0].primarycontact_companytell ? response['data'][0].primarycontact_companytell.split(',') : " ";
      this.CompanyTel = primarycontact_companytell[0];

      //   this.dataArray.forEach(i => {
        // console.log(shareholder_name.length)
        // for(var i=0; i <= shareholder_name.length; i++) {

            // this.dataArray.push(
            //     this.addMore.name = shareholder_name[0],
            //     this.addMore.nationality = shareholder_nationality[0],
            //     this.addMore.percentage = shareholder_percentage[0],
                
      
            // ); 
        // }
          
    //   });


      
      this.spinner.hide();
    })
}


}
