// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  filter: FormGroup;
  statusChange: FormGroup;
  sendNotifivation: FormGroup;
  membershipList;
  membershipId;
  notifyMembershipId;
  filterClearBtn: Boolean = false;
  sigdisplay = 'none';
  @ViewChild('autoShownModal', { static: false }) autoShownModal: ModalDirective;
  @ViewChild('notifyShownModal', { static: false }) notifyShownModal: ModalDirective;

  isModalShown = false;
  isNotifyModalShown = false;
  topicOthers = false;

  constructor(private myBuilder: FormBuilder,
              private adminService: AdminService,
              private spinner:NgxSpinnerService,
              private router: Router) { }

  ngOnInit() {
     this.getMemberships();
     this.filter=this.myBuilder.group({      
      membership_id: [''],
      invoice_no: [''],
      reciept_no: [''],
      mem_cer_no: [''],
      city: [''],
      state: ['']
    });
    
  
  /*var p = {
    name: 'Alfred',
    nn: 'Alfy',
  };
  console.log(`Hi, I'm ${p.name}! Call me "${p.nn}".`);*/

  }


  getMemberships(){
    this.spinner.show();
    this.membershipList = [];
    this.adminService.getAllMembershipList().subscribe( response => {
      console.log(response);
      this.membershipList = response['data'];
      this.spinner.hide();
     this.filterClearBtn = false;
     this.filter.reset();
    })
  }

  filterForm( model: FormGroup){
    console.log(model);
    this.spinner.show();
    this.membershipList = [];
    this.adminService.adminLandingPageFilter( model.value).subscribe( response => {
      
      // console.log(response);
     this.membershipList = response.data;
     this.spinner.hide();
    //  $('#newPostModal').modal('hide');    
      this.filterClearBtn = true;
      this.hideModal();
    })
}

showModal() {
  this.sigdisplay='block';
}

hideModal(): void {
  // this.autoShownModal.hide();
  this.sigdisplay='none';
}




  

  
}

