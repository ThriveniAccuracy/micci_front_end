import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { addMore } from './addmore.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AdminAccountsService } from '../services/adminAccounts.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';

@Component({
  selector: 'app-admin-invoice',
  templateUrl: './admin-invoice.component.html',
  styleUrls: ['./admin-invoice.component.css']
})
export class AdminInvoiceComponent implements OnInit {
  @ViewChild('autoShownModal', { static: false }) autoShownModal: ModalDirective;
  modalRef: BsModalRef;
  membershipInvoice:FormGroup;
  requestInvoice:FormGroup;
  generateInvoice:FormGroup
  membershipList:any[];
  requestList:any[];
  tableList1:boolean = false;
  tableList2:boolean = false;
  isModalShown = false;
  addMore = new addMore();

  dataArray = [];
  constructor(private router: Router, private formBuilder:FormBuilder, 
    private accountsService:AdminAccountsService, private spinner:NgxSpinnerService,
    private modalService: BsModalService) { }

  ngOnInit() {
    this.membershipInvoice = this.formBuilder.group({
      membershipId4:['', Validators.required],
      invoice_num: ['', Validators.required]
    });

    this.requestInvoice = this.formBuilder.group({
      membershipId2:['', Validators.required],
      companyName:['', Validators.required]
    });

    this.generateInvoice = this.formBuilder.group({
      membership_id:['', Validators.required],
    //   company_name:['', Validators.required],
    //   name:['', Validators.required],
    //   others:['', Validators.required],
      amount:['', Validators.required]
    });
    this.addMore = new addMore();
    this.dataArray.push(this.addMore); 
  }


  goToInvoice(){
      this.router.navigate(['/admin-form1']);     
}

showModal() {
  this.isModalShown = true;
}

hideModal() {
  this.autoShownModal.hide();
}

add(){
  this.addMore = new addMore();
  this.dataArray.push(this.addMore);
}

remove(index){
this.dataArray.splice(index);
}   




onMembershipSubmit(model:FormGroup){
    console.log(model.value);
  this.spinner.show();
  this.membershipList = [];
  this.accountsService.getMembershipInvoiceFilter(model.value).subscribe( res => {
      console.log(res);
      if(res.status === false) {
          this.spinner.hide();
        swal.fire(
            'Failes!',
             res.message,
            'error'
          ).then(function(){
            location.reload();
        }); 

      } else {
        this.tableList1 = true;
        this.membershipList = res.data;
        console.log(this.membershipList);
        this.spinner.hide();
      }
   
    // if(res.data.length > 0){
    //   this.tableList1 = true;
    //   this.membershipList = res.data;
    //   console.log(this.membershipList);
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
    if(this.requestList.length > 0){
      this.tableList2 = true;
      this.spinner.hide();
    }
  })
}

onGenerateInvoiceSubmit(model:FormGroup){
  this.spinner.show();
  this.accountsService.postGenerateInvoice(model.value).subscribe( res => {
    console.log(res);
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
