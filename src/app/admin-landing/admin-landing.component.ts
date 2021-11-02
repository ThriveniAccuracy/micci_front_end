import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import { ModalDirective } from 'ngx-bootstrap/modal';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin-landing',
  templateUrl: './admin-landing.component.html',
  styleUrls: ['./admin-landing.component.css']
})
export class AdminLandingComponent implements OnInit {
  editorConfig = { editable: true, spellcheck: false, height: '10rem', minHeight: '5rem', placeholder: 'Type something. Test the Editor... ヽ(^。^)丿', translate: 'no' };
  membershipList: any[];
  membership_id_f:number;
  company_name_f:string;
  sigdisplay1 = 'none';
  sigdisplay2 = 'none';
  sigdisplay3 = 'none';
  sigdisplay4 = 'none';
  
  filterData:any;
  viewReceiptForm: FormGroup;
  sendtoapprover:FormGroup;
  tempUserid:string;

  filter: FormGroup;
  statusChange: FormGroup;
  sendNotifivation: FormGroup;
  sendtomanager:FormGroup;
  membershipId;
  notifyMembershipId;
  filterClearBtn: Boolean = false;
  sigdisplay = 'none';
  @ViewChild('autoShownModal', { static: false }) autoShownModal: ModalDirective;
  @ViewChild('notifyShownModal', { static: false }) notifyShownModal: ModalDirective;

  isModalShown = false;
  isNotifyModalShown = false;
  topicOthers = false;
  viewReceipt:any[];


  company_name: string;
    trade_name: string;
    branch: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    country: string;
    pincode:  string;
    company_tel: string;  
    company_fax: string;
    company_website: string;
    ma_address1: string;
    ma_address2: string;
    ma_state: string;
    ma_pincode: string;
    ma_country: string;    
    type_of_company: string;
    others: string;
    c_r_date: string;
    c_r_number: string;
    a_capital: string;
    i_capital: string;
    n_of_full_t_employees: string;
    y_m_category: string;
    d_o_principal_b_activities: string;
    business_sector: string;
    b_others: string;
    business_sub_sector: string;
    nationality: string;
    name: string;
    percentage: string;
    seconded_by: string;
    proposed_by: string;
    ma_city: string;
   
    b1_others: string;
    n_c_r_number: string; 
    created_date: string;
    
    u_ssm_c_profile: FileList | null;
    u_b_card: FileList | null;
    remarks:any;

    membership_id:any;

  constructor(private myBuilder: FormBuilder,
              private adminService: AdminService,
              private spinner:NgxSpinnerService,
              private router: Router,
              private datePipe: DatePipe) { }

  ngOnInit() {
     this.getMemberships();
     this.viewReceiptForm = this.myBuilder.group({
        invoiceNo: ['', [Validators.required]],
        status: ['', [Validators.required]],
        userId:[''],
    })
     this.filter=this.myBuilder.group({      
      membership_id: [''],
      invoice_no: [''],
      reciept_no: [''],
      mem_cer_no: [''],
      city: [''],
      state: ['']
      // date: ['']

    });
    this.statusChange = this.myBuilder.group({
      status: ['', [Validators.required]]
  });
  this.sendNotifivation = this.myBuilder.group({
    topic: [''],
    others: [''],
    content: ['']
  });
  this.sendtomanager = this.myBuilder.group({
    member_id: ['', [Validators.required]],
    // admin_name: ['', [Validators.required]]
  });
  this.sendtoapprover = this.myBuilder.group({
    member_id: ['', [Validators.required]],
    // admin_name: ['', [Validators.required]]
});
  /*var p = {
    name: 'Alfred',
    nn: 'Alfy',
  };
  console.log(`Hi, I'm ${p.name}! Call me "${p.nn}".`);*/
  /*var date = moment.utc().format('YYYY-MM-DD HH:mm:ss');

console.log(date); // 2015-09-13 03:39:27

var stillUtc = moment.utc(date).toDate();
console.log(stillUtc);
var local = moment(stillUtc).local().format('YYYY-MM-DD HH:mm:ss');

console.log(local); // 2015-09-13 09:39:27*/

  }

  showmanagerModal() {
    this.sigdisplay1 = 'block';
    }
hidemanagerModal() {
    this.sigdisplay1 = 'none';
    this.getMemberships();
}

showViewModal() {
    this.sigdisplay2 = 'block';
    }
hideViewModal() {
    this.sigdisplay2 = 'none';
    this.getMemberships();
}

showDeleteModal() {
    this.sigdisplay3 = 'block';
    }
hideDeleteModal() {
    this.sigdisplay3 = 'none';
    this.getMemberships(); 
}

showApproveModal() {
    this.sigdisplay4 = 'block';
  }
  hideApproveModal() {
    this.sigdisplay4 = 'none';
    this.getMemberships();
  }

photoView(event: string) {
    
    console.log(event)

    window.open(event, "_blank");
    
}

photoView1(event: string) {
    
    console.log(event)

    window.open(event, "_blank");
    
}

showSendtoManagerModal(data){
    console.log(data);
    // var testObject = data;
    localStorage.setItem('IMDATA', JSON.stringify(data));
    this.router.navigate(['generate-invoice']);
    // debugger;
    // console.log(member_id);
    // this.sendtomanager.controls['member_id'].patchValue(member_id);
    // this.showmanagerModal();
}

getViewModal(m_id) {
    console.log(m_id);
    this.spinner.show();
    this.adminService.getMembershipView(m_id).subscribe( response => {
        console.log(response);
        this.membership_id = response.data[0]['user_id'];
        this.company_name = response.data[0]['member_company_name'];
        this.trade_name = response.data[0]['member_trade_name'];
        this.branch = response.data[0]['branch_name'];
        this.address1 = response.data[0]['address1'];
        this.address2 = response.data[0]['address2'];
        this.city = response.data[0]['city'];
        this.state = response.data[0]['member_state'];
        this.country = response.data[0]['country'];
        this.pincode = response.data[0]['pincode'];
        this.company_tel = response.data[0]['company_tel'];  
        this.company_fax = response.data[0]['company_fax'];
        this.company_website = response.data[0]['company_website'];
        
        this.ma_address1 = response.data[0]['ma_address1'];
        this.ma_address2 = response.data[0]['ma_address2'];
        this.ma_city = response.data[0]['ma_city'];
        this.ma_state = response.data[0]['ma_state'];
        this.ma_pincode = response.data[0]['ma_pincode'];
        this.ma_country = response.data[0]['ma_country']; 

        this.c_r_date = this.datePipe.transform(response.data[0]['c_r_date'],"dd-MM-yyyy");
        this.type_of_company = response.data[0]['type_of_company'];
        // this.others = response.data[0]['others'];
        this.c_r_number = response.data[0]['c_r_number'];
        this.n_c_r_number = response.data[0]['n_c_r_number']; 
        this.a_capital = response.data[0]['a_capital'];
        this.i_capital = response.data[0]['i_capital'];
        this.n_of_full_t_employees = response.data[0]['n_of_full_t_employees'];
        this.y_m_category = response.data[0]['y_m_category'];
        this.d_o_principal_b_activities = response.data[0]['d_o_principal_b_activities'];
        this.business_sector = response.data[0]['business_sector'];
        // this.b_others = response.data[0][''];
        this.business_sub_sector = response.data[0]['business_sub_sector'];
        // this.b1_others = response.data[0][''];

        // this.nationality = response.data[0][''];
        // this.name = response.data[0][''];
        // this.percentage = response.data[0][''];
        this.seconded_by = response.data[0]['seconded_by'];
        this.proposed_by = response.data[0]['proposed_by'];
   
        
        this.u_ssm_c_profile = response.data[0]['u_ssm_c_profile'];
        this.u_b_card = response.data[0]['u_b_card'];
        this.remarks = response.data[0]['approver_remarks'];
        
        this.created_date = this.datePipe.transform(response.data[0]['created_date'],"dd-MM-yyyy");

        this.spinner.hide();    
    });

}


  getMemberships(){
    this.spinner.show();
    this.membershipList = [];
    this.adminService.getAllMembershipList().subscribe( response => {
    //   console.log(response);
      this.membershipList = response['data'].reverse();
      this.filterData = response['data'];
      console.log(this.membershipList);
      this.spinner.hide();
    //  this.filterClearBtn = false;
    //  this.filter.reset();
    })
  }

//   filterForm( model: FormGroup){
//     console.log(model);
//     this.spinner.show();
//     this.membershipList = [];
//     this.adminService.adminLandingPageFilter( model.value).subscribe( response => {
      
//       // console.log(response);
//      this.membershipList = response.data;
//      this.spinner.hide();
//     //  $('#newPostModal').modal('hide');    
//       this.filterClearBtn = true;
//       this.hideModal();
//     })
// }

showModal() {
  this.sigdisplay = 'block';
}

hideModal(): void {
  this.sigdisplay = 'none';
}



showNotifyModal(data) {
  // console.log(data);  
  this.notifyMembershipId = '';
  this.isNotifyModalShown = true;
  this.notifyMembershipId = data.user_id;
}

hideNotifyModal(): void {
  this.isNotifyModalShown = false;
}

topic(event){
  console.log(event)
  if(event == "Others"){
    this.topicOthers = true;
  } else {
    this.topicOthers = false;
  }
}

showStatusModal(){
  this.isModalShown = true;
}

hideStatusModal(){
  this.isModalShown = false;
}

statusClick(data){
  this.statusChange.reset();
  this.membershipId = '';
    console.log(data);
    this.membershipId = data.membership_id;
    this.showStatusModal();
}

  statusSubmit( model: FormGroup ) {
    this.spinner.show();
    this.adminService.adminApplicationStatusChange( model.value, this.membershipId ).subscribe( response => {
         
        console.log(response);
        this.spinner.hide();
         swal.fire(
              'success!',
              'Status Updated Successully',
              'success'
            )
            this.getMemberships();
            this.hideStatusModal();
    }, 
        error => {
          //   this.alertNotSuccess();            
        } );
  } 


  notifySubmit( model: FormGroup ) {
    console.log(model.value);
    console.log(model.value.content.content[0].content[0].text);
    
    this.spinner.show();
    this.adminService.notify( model.value, this.notifyMembershipId ).subscribe( response => {
         
        console.log(response);
        this.spinner.hide();
         swal.fire(
              'success!',
              'Mail Sent Successfully',
              'success'
            )
            this.getMemberships();
            this.hideNotifyModal();
    }, 
        error => {
            // this.alertNotSuccess();            
        } );
  } 

  onSubmitmanager(model: FormGroup) {
    
    console.log(model.value)
    this.adminService.postSendbyadmin(model.value).subscribe(res => {
      
      // console.log(res);
      swal.fire(
        'success!',
        'Applicant Sent to Executive Director Successfully',
        'success'
      ).then(function () {
        location.reload();
      });
    },
      error => {
        swal.fire(
          'Failes!',
          error,
          'error'
        ).then(function () {
          location.reload();
        });
      });
  }

  applyFilter(event:string) {
    let filterValueLower = event;
    console.log(filterValueLower);
    if(event === "null" ) {
        this.membershipList = this.filterData;
    } else  if(event === "Send to Central Manager" ) {
        this.membershipList  = this.filterData.filter((id) => id.application_status === 'Send to Central Manager')
        console.log(this.membershipList);
    } else  if(event === "Approved" ) {
        this.membershipList  = this.filterData.filter((id) => id.application_status === 'Approved')
        console.log(this.membershipList);
    } else  if(event === "Rejected" ) {
        this.membershipList  = this.filterData.filter((id) => id.application_status === 'Rejected')
    } else {
        console.log(event)
       this.membershipList  = this.filterData.filter((id) => id.application_status === event)
       console.log(this.membershipList)
    }

  }

  deleteEventOnRow(user_id) {
    console.log(user_id);
    this.tempUserid = user_id;
    this.adminService.getViewReceipt(user_id).subscribe( response => {
        console.log(response['data'][0]['invoice_no']);
        this.viewReceipt = response['data'];
        console.log(this.viewReceipt);
        this.viewReceiptForm.controls['invoiceNo'].patchValue(response['data'][0]['invoice_no']);
        this.viewReceiptForm.controls['userId'].patchValue(this.tempUserid);
        
        this.spinner.hide();    
    });
    // this.reject.controls['member_id'].patchValue(member_id);
    // this.showDeleteModal();
  }

  onSubmitViewReceipt(model: FormGroup) {
    console.log(model.value);
    // const formData = new FormData();
    // formData.append('membership_id', model.value.member_id);
    this.adminService.postSendPaymentStatus(model.value).subscribe(res => {
      console.log(res);
      swal.fire(
        'success!',
        'Payment Status Successfully',
        'success'
      ).then(function () {
        // this.getCreatedEvents();
        location.reload();
      });
    },
      error => {
        swal.fire(
          'Failes!',
          error,
          'error'
        ).then(function () {
          location.reload();
        });
      });
  }

  approveEventOnRow(member_id) {
    console.log(member_id);
    this.sendtoapprover.controls['member_id'].patchValue(member_id);
    this.showApproveModal();
  }

  onSubmitapprover(model: FormGroup) {
    
    console.log(model.value)
    this.adminService.postSendtoappover(model.value).subscribe(res => {
      
      // console.log(res);
      swal.fire(
        'success!',
        'Applicant Sent to Board Members Successfully',
        'success'
      ).then(function () {
        location.reload();
      });
    },
      error => {
        swal.fire(
          'Failes!',
          error,
          'error'
        ).then(function () {
          location.reload();
        });
      });
    }
 
}

