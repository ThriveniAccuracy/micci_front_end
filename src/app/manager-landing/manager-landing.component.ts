import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-manager-landing',
  templateUrl: './manager-landing.component.html',
  styleUrls: ['./manager-landing.component.css']
})
export class ManagerLandingComponent implements OnInit {

    managerList:any[];
    viewReceipt:any[];
    membership_id_f:number;
  company_name_f:string;
  filterData:any;
    sigdisplay = 'none';
    sigdisplay2 = 'none';
    sigdisplay3 = 'none';
    sigdisplay1 = 'none';
    viewReceiptForm: FormGroup;
    approve: FormGroup;
    sendtoapprover:FormGroup;

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

    tempUserid:string;


  constructor(private myBuilder: FormBuilder,
    private adminService: AdminService,
    private spinner:NgxSpinnerService,
    private router: Router,private datePipe: DatePipe) { }

  ngOnInit() {
    this.getManagerData();
    this.viewReceiptForm = this.myBuilder.group({
        invoiceNo: ['', [Validators.required]],
        status: ['', [Validators.required]],
        userId:[''],
    })
    this.approve = this.myBuilder.group({
        member_id: ['', [Validators.required]],
        remarks: ['', [Validators.required]],
    });
    this.sendtoapprover = this.myBuilder.group({
        member_id: ['', [Validators.required]],
        // admin_name: ['', [Validators.required]]
    });
  }

  showDeleteModal() {
    this.sigdisplay = 'block';
  }
  hideDeleteModal() {
    this.sigdisplay = 'none';
    this.getManagerData();
  }
  showApproveModal() {
    this.sigdisplay3 = 'block';
  }
  hideApproveModal() {
    this.sigdisplay3 = 'none';
    this.getManagerData();
  }
  showViewModal() {
    this.sigdisplay2 = 'block';
    }
    hideViewModal() {
        this.sigdisplay2 = 'none';
        this.getManagerData();
    }

    showapproverModal() {
        this.sigdisplay1 = 'block';
        }
    hideapproverModal() {
        this.sigdisplay1 = 'none';
        this.getManagerData();
    }
    photoView(event: string) {
    
        console.log(event)
    
        window.open(event, "_blank");
        
    }
    
    photoView1(event: string) {
        
        console.log(event)
    
        window.open(event, "_blank");
        
    }

    receiptView(event: string){
        
        console.log(event)
    
        window.open(event, "_blank");
        
    }

    
    showSendtoApproverModal(data){
        console.log(data);
        localStorage.setItem('BODDATA', JSON.stringify(data));
        this.router.navigate(['generate-invoice-view']);
    // debugger;
    // console.log(member_id);
    // this.sendtoapprover.controls['member_id'].patchValue(member_id);
    // this.showapproverModal();
}

  getManagerData(){
    this.spinner.show();
    this.managerList = [];
    this.adminService.getAllManagerList().subscribe( response => {
      console.log(response);
      this.managerList = response['data'].reverse();
      this.filterData = response['data'];
      this.spinner.hide();
    })
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

  deleteEventOnRow(user_id) {
    console.log(user_id);
    this.tempUserid = user_id;
    this.adminService.getViewReceipt(user_id).subscribe( response => {
        console.log(response['data'][0]['invoice_no']);
        this.viewReceipt = response['data'];
        this.viewReceiptForm.controls['invoiceNo'].patchValue(response['data'][0]['invoice_no']);
        this.viewReceiptForm.controls['userId'].patchValue(this.tempUserid);
        // this.membership_id = response.data[0]['membership_id'];
        // this.company_name = response.data[0]['member_company_name'];
        // this.trade_name = response.data[0]['member_trade_name'];
        // this.branch = response.data[0]['branch_name'];
        // this.address1 = response.data[0]['address1'];
        // this.address2 = response.data[0]['address2'];
        // this.city = response.data[0]['city'];
        // this.state = response.data[0]['member_state'];
        // this.country = response.data[0]['country'];
        // this.pincode = response.data[0]['pincode'];
        // this.company_tel = response.data[0]['company_tel'];  
        // this.company_fax = response.data[0]['company_fax'];
        // this.company_website = response.data[0]['company_website'];
        
        // this.ma_address1 = response.data[0]['ma_address1'];
        // this.ma_address2 = response.data[0]['ma_address2'];
        // this.ma_city = response.data[0]['ma_city'];
        // this.ma_state = response.data[0]['ma_state'];
        // this.ma_pincode = response.data[0]['ma_pincode'];
        // this.ma_country = response.data[0]['ma_country']; 

        // this.c_r_date = this.datePipe.transform(response.data[0]['c_r_date'],"dd-MM-yyyy");
        // this.type_of_company = response.data[0]['type_of_company'];
        // // this.others = response.data[0]['others'];
        // this.c_r_number = response.data[0]['c_r_number'];
        // this.n_c_r_number = response.data[0]['n_c_r_number']; 
        // this.a_capital = response.data[0]['a_capital'];
        // this.i_capital = response.data[0]['i_capital'];
        // this.n_of_full_t_employees = response.data[0]['n_of_full_t_employees'];
        // this.y_m_category = response.data[0]['y_m_category'];
        // this.d_o_principal_b_activities = response.data[0]['d_o_principal_b_activities'];
        // this.business_sector = response.data[0]['business_sector'];
        // // this.b_others = response.data[0][''];
        // this.business_sub_sector = response.data[0]['business_sub_sector'];
        // // this.b1_others = response.data[0][''];

        // // this.nationality = response.data[0][''];
        // // this.name = response.data[0][''];
        // // this.percentage = response.data[0][''];
        // this.seconded_by = response.data[0]['seconded_by'];
        // this.proposed_by = response.data[0]['proposed_by'];
   
        
        // this.u_ssm_c_profile = response.data[0]['u_ssm_c_profile'];
        // this.u_b_card = response.data[0]['u_b_card'];

        // this.remarks = response.data[0]['remarks'];
        
        // this.created_date = this.datePipe.transform(response.data[0]['created_date'],"dd-MM-yyyy");

        this.spinner.hide();    
    });
    // this.reject.controls['member_id'].patchValue(member_id);
    // this.showDeleteModal();
  }
  approveEventOnRow(member_id) {
    console.log(member_id);
    this.sendtoapprover.controls['member_id'].patchValue(member_id);
    this.showApproveModal();
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
  onSubmitApprove(model: FormGroup) {
    console.log(model.value);
    // const formData = new FormData();
    // formData.append('membership_id', model.value.member_id);
    // formData.append('remarks', model.value.remarks);
    this.adminService.postMembershipApprove(model.value).subscribe(res => {
      console.log(res);
      swal.fire(
        'success!',
        'Membership Approved Successfully',
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

  onSubmitapprover(model: FormGroup) {
    
    console.log(model.value)
    this.adminService.postSendtoappover(model.value).subscribe(res => {
      
      // console.log(res);
      swal.fire(
        'success!',
        'Applicant Sent to Membership Sales Successfully',
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
            this.managerList = this.filterData;
        } else  if(event === "Paid" ) {
            this.managerList  = this.filterData.filter((id) => id.payment_status === 'Paid')
            console.log(this.managerList);
        } else if(event === "Unpaid" ) {
            console.log(event)
           this.managerList  = this.filterData.filter((id) => id.payment_status === 'Pending' || id.application_status === 'Unpaid' )
           console.log(this.managerList)
        } else {
            console.log(event)
            this.managerList  = this.filterData.filter((id) => id.payment_status === event )
            console.log(this.managerList)
        }
    
    }

    // getInvoiceList(){
    //     this.dataList = [];
    //     this.spinner.show();
    //     this.accountsService.getInvoiceList().subscribe( response => {
    //       console.log(response.data);
    //         if(response.status === false) { 
    //             this.spinner.hide();
    //             swal.fire(
    //                 'Alert!',
    //                 "You don't have any invoices currently!!",
    //                 'error'
    //             );
    //             this._location.back();
                
    //         } else {
    
    //             this.dataList = response['data'];
    //             this.filterData = response['data'];
    //             this.spinner.hide();
    //         }
    //     })
    //  }

}