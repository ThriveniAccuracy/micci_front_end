import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AdminAccountsService } from '../services/adminAccounts.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';

@Component({
  selector: 'app-admin-receipt',
  templateUrl: './admin-receipt.component.html',
  styleUrls: ['./admin-receipt.component.css']
})
export class AdminReceiptComponent implements OnInit {
  @ViewChild('autoShownModal', { static: false }) autoShownModal: ModalDirective;
  modalRef: BsModalRef;
  membershipInvoice:FormGroup;
  requestInvoice:FormGroup;
  proofPayment:FormGroup;
  generateReceipt:FormGroup;
  membershipList:any[];
  requestList:any[];
  proofList:any[];
  tableList1:boolean = false;
  tableList2:boolean = false;
  tableList3:boolean = false;
  isModalShown = false;
  paymentOthers = false;
  constructor(private router:Router, private formBuilder:FormBuilder, 
    private accountsService:AdminAccountsService, private spinner:NgxSpinnerService,
    private modalService: BsModalService) { }

  ngOnInit() {

    this.membershipInvoice = this.formBuilder.group({
      membershipId1:['', Validators.required],
      receiptNumber:['', Validators.required]
    });

    this.requestInvoice = this.formBuilder.group({
      membershipId2:['', Validators.required],
      companyName:['', Validators.required]
    });

    this.proofPayment = this.formBuilder.group({
      membershipId3:['', Validators.required],
      companyName2:['', Validators.required]
    });
    
    this.generateReceipt = this.formBuilder.group({
      membership_id:['', Validators.required],
      invoice_no:['',Validators.required],
    //   company_name:['', Validators.required],
      payment_method:['', Validators.required],
    //   others:['', Validators.required],
    //   particulars:['', Validators.required],
      amount:['', Validators.required]
    });

  }
  goToReceipt(){
    this.router.navigate(['/admin-form2']);
}


showModal() {
  this.isModalShown = true;
}

hideModal() {
  this.autoShownModal.hide();
}

payment(event){
  console.log(event)
  if(event == "Others"){
    this.paymentOthers = true;
  } else {
    this.paymentOthers = false;
  }
}



onMembershipSubmit(model:FormGroup){
  this.spinner.show();
  this.membershipList = [];
  this.accountsService.getMembershipAccount(model.value).subscribe( res => {
    if (res.data[0].receipt_number === null) {
        this.spinner.hide();
        swal.fire(
            'Alert!',
            "Don't have any receipts currently to this Membership Id!!",
            'error'
        );

    }  else {
        this.membershipList = res['data'];
        console.log(this.membershipList);
        this.tableList1 = true;
        this.spinner.hide();
    }

    // if( this.membershipList.length > 0){
    //   this.tableList1 = true;
    //   this.spinner.hide();
    // }
    
  })
}

onRequestSubmit(model:FormGroup){
  this.spinner.show();
  this.requestList = [];
  this.accountsService.getRequestInvoiceFilter(model.value).subscribe( res => {
    this.requestList = res['data'];
    console.log(this.requestList);
    if( this.requestList.length > 0){
      this.tableList2 = true;
      this.spinner.hide();
    }
  })
}

onProofSubmit(model:FormGroup){
  this.spinner.show();
  this.proofList = [];
  this.accountsService.getProofOfPayment(model.value).subscribe( res => {
    this.proofList = res['data'];
    console.log(this.proofList);
    if( this.proofList.length > 0){
      this.tableList3 = true;
      this.spinner.hide();
    }
  })
}

onGenerateReceipt(model:FormGroup){
  this.spinner.show();
  this.accountsService.postAdminGenerateSubmit(model.value).subscribe( res => {
    this.spinner.hide();
    swal.fire(
        'success!',
      res.message,
      'success'
    ).then(function(){
      location.reload();
    });
  },
  error => {
    swal.fire(
      'Failes!',
       error,
      'error'
    ).then(function(){
      location.reload();
    }); 
   });
}

openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template);
}
}