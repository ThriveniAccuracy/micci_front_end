import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { addMore } from './addmore.model';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AdminAccountsService } from '../services/adminAccounts.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';

@Component({
  selector: 'app-admin-renewal',
  templateUrl: './admin-renewal.component.html',
  styleUrls: ['./admin-renewal.component.css']
})

export class AdminRenewalComponent implements OnInit {
  
  @ViewChild('autoShownModal', { static: false }) autoShownModal: ModalDirective;
  modalRef: BsModalRef;
  addMore = new addMore();
  renewalNotice:FormGroup;
  generateRenewal:FormGroup;
  tableList:boolean = false;
  renewal:any[];
  isModalShown = false;
  dataArray = [];
  constructor(private router: Router, private accountsService:AdminAccountsService,
    private formBuilder:FormBuilder, private spinner:NgxSpinnerService, 
    private modalService: BsModalService) { }

  ngOnInit() {

    this.renewalNotice = this.formBuilder.group({
      renewalId:['', Validators.required]
    })

    this.generateRenewal = this.formBuilder.group({
      membership_id:['', Validators.required],
    //   company_name:['', Validators.required],
    //   name:['', Validators.required],
    //   others:['', Validators.required],
      amount:['', Validators.required]
    })

    this.addMore = new addMore();
    this.dataArray.push(this.addMore); 
  }

  goToRenewal(){
    this.router.navigate(['/admin-renewalform']);
  }

  showModal() {
    this.isModalShown = true;
  }
 
  hideModal(): void {
    this.autoShownModal.hide();
  }

  add(){
    this.addMore = new addMore();
    this.dataArray.push(this.addMore);
 }

 remove(index){
  this.dataArray.splice(index);
}   





  onNotice(model:FormGroup){
    this.spinner.show();
    this.renewal = [];
    this.accountsService.getAdminRenewalForm(model.value).subscribe(res => {
      // console.log(res);
      this.renewal = res['data'];
      console.log(this.renewal);
      if( this.renewal.length > 0){
        this.tableList = true;
        this.spinner.hide();
      }
      
    });
  }


  onGenerateRenewalNotice(model:FormGroup){
    this.spinner.show();
    this.accountsService.postGenerateRenewalNotice(model.value).subscribe( res => {
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

