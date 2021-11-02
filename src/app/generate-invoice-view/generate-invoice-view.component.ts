import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from '../services/admin.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-generate-invoice-view',
  templateUrl: './generate-invoice-view.component.html',
  styleUrls: ['./generate-invoice-view.component.css']
})
export class GenerateInvoiceViewComponent implements OnInit {

    invoiceFormGroup: FormGroup;
    address1:any;
    address2:any;
    state:any;
    pincode:any;
    city:any;

    currentdate : any;
    currentyear: any;
    nextyear:any;
    invoiceNo:any;
    memberName:any;
    memberPhone:any;
    memberFax:any;
    tda1:any = 0;
    tda2:any = 0;
    tda3:any = 0;
    tdd1:any;
    tdd2:any;
    tdd3:any;
    date:any;
    userId:any;
    invoiceData:[];
    sigdisplay = 'none';
    sigdisplay2 = 'none';
    sigdisplay3 = 'none';
    reject: FormGroup;
    approve: FormGroup;

  constructor(private adminService: AdminService,private myBuilder: FormBuilder,
    private spinner:NgxSpinnerService,
    private router: Router) { }

  ngOnInit() {
    var memdata=  JSON.parse(localStorage.getItem('BODDATA')) ;
    console.log(memdata);
    this.userId = memdata["user_id"];
    this.address1 = memdata["address1"];
    this.address2 = memdata["address2"];
    this.state = memdata["member_state"];
    this.pincode = memdata["pincode"];
    this.city = memdata["city"];
    this.memberName = memdata["first_name"] + ' ' + memdata["middle_name"] + ' ' + memdata["last_name"];
    this.memberPhone = memdata["company_tel"];
    this.memberFax = memdata["company_fax"];
    // this.currentdate = new Date();
    var datec = new Date();
    this.currentyear = datec.getFullYear();
    this.nextyear = datec.getFullYear()+1;
    // this.invoiceNo = Math.floor(10 + Math.random() * 90) + "/MICCI/" + this.currentyear ;
    this.retrveinvoice(this.userId);

    this.invoiceFormGroup = this.myBuilder.group({  
        invoiceNo: [this.invoiceNo],
        userId: [this.userId],
        date: [this.currentdate],          
        tdd1: [''],
        tdd2: [''],
        tdd3: [''],
        tda1:[''],
        tda2:[''],
        tda3:[''],
    });
    this.reject = this.myBuilder.group({
        user_id: ['', [Validators.required]],
        remarks: ['', [Validators.required]],
    })
    this.approve = this.myBuilder.group({
        user_id: ['', [Validators.required]],   
    })
  }

  showDeleteModal() {
    this.sigdisplay = 'block';
  }
  hideDeleteModal() {
    this.sigdisplay = 'none';
    this.retrveinvoice(this.userId);
  }
  showApproveModal() {
    this.sigdisplay3 = 'block';
  }
  hideApproveModal() {
    this.sigdisplay3 = 'none';
    this.retrveinvoice(this.userId);
  }
  showViewModal() {
    this.sigdisplay2 = 'block';
    }
    hideViewModal() {
        this.sigdisplay2 = 'none';
        this.retrveinvoice(this.userId);
    }

    retrveinvoice(user_id) {
        console.log(user_id);
        this.spinner.show();
        this.adminService.postSendGenerateInvoice(user_id).subscribe(response => {
            console.log(response);
            this.invoiceNo = response['data'][0].invoice_no,
            this.currentdate = response['data'][0].creation_date,
                
                this.userId= response['data'][0].user_id,
                this.date= response['data'][0].creation_date,          
                this.tdd1= response['data'][0].subscription_details,
                this.tdd2= response['data'][0].discount_details,
                this.tdd3= response['data'][0].other_details,
                this.tda1= response['data'][0].subscription_fees,
                this.tda2= response['data'][0].discount_fees,
                this.tda3= response['data'][0].other_fees,
            // this.invoiceData=response['data'];
            // this.invoiceFormGroup.patchValue({
            //     invoiceNo: response['data'][0].invoice_no,
                
            //     userId: response['data'][0].user_id,
            //     date: response['data'][0].creation_date,          
            //     tdd1: response['data'][0].subscription_details,
            //     tdd2: response['data'][0].discount_details,
            //     tdd3: response['data'][0].other_details,
            //     tda1: response['data'][0].subscription_fees,
            //     tda2: response['data'][0].discount_fees,
            //     tda3: response['data'][0].other_fees,
            // });
            
                
            this.spinner.hide();
            // swal.fire(
            //     'success!',
            //     'Generate Invoice Successfully',
            //     'success'
            // );
            // }, error => {
            // this.spinner.hide();
            // swal.fire(
            //     'Failes!',
            //     error,
            //     'error'
            // )
        })
    }


    onSubmitGenerateInvoice(model: FormGroup) {
        console.log(model.value);
        this.spinner.show();
        this.adminService.postSendInvoiceToUser(model.value).subscribe(response => {
            console.log(response);
                
        this.spinner.hide();
        swal.fire(
            'success!',
            'Generate Invoice Successfully',
            'success'
        ).then(function () {
            location.reload();
            this.router.navigate(['manager-landing']);
        });
        
        }, error => {
        this.spinner.hide();
        swal.fire(
            'Failes!',
            error,
            'error'
        )
        })
    }

    approveInvoice(user_id){
        console.log(user_id);
        this.approve.controls['user_id'].patchValue(user_id);
        this.showApproveModal();
    }

    rejectInvoice(user_id){
        console.log(user_id);
        this.reject.controls['user_id'].patchValue(user_id);
        this.showDeleteModal();
    }

    onSubmitReject(model: FormGroup) {
        console.log(model.value);
       
        this.adminService.postInvoiceReject(model.value).subscribe(res => {
          console.log(res);
          swal.fire(
            'success!',
            'Invoice Rejected Successfully',
            'success'
          ).then(function () {
            // this.getCreatedEvents();
            location.reload();
          });
          this.router.navigate(['manager-landing']);
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
        this.adminService.postInvoiceApprove(model.value).subscribe(res => {
          console.log(res);
          swal.fire(
            'success!',
            'Invoice Approved Successfully',
            'success'
          ).then(function () {
            // this.getCreatedEvents();
            location.reload();
          });
          this.router.navigate(['manager-landing']);
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
