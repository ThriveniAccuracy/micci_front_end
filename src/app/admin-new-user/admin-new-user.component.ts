import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from '../services/admin.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import swal from 'sweetalert2';
// import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-new-user',
  templateUrl: './admin-new-user.component.html',
  styleUrls: ['./admin-new-user.component.css']
})
export class AdminNewUserComponent implements OnInit {

    // @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  p: number = 1;
    
  newUserList;
  sigdisplay1 = 'none';
  userId:any;
  cdate:any;
  userType:any;
  firstName:any;
  middleName:any;
  lastName:any;
  mailId:any;
  contactNo:any;
  mobileNo:any;
  companyName:any;
  tradeName:any;
  designation:any;
  state:any;
  applicantStatus:any;
  membershipId:any;
  membershipStatus:any;
  pphoto:any;


  constructor(private adminService: AdminService,private myBuilder: FormBuilder,
    private spinner:NgxSpinnerService,
    private router: Router) { }

    ngOnInit() {
        this.getNewUserList();
    }

    showUpdateModal() {
        this.sigdisplay1 = 'block';
    }
    hideUpdateModal() {
        this.sigdisplay1 = 'none';
        this.getNewUserList();
    }

    photoView(event: string) {
    
        console.log(event)

        window.open(event, "_blank");
        
    }
    
    
    getNewUserList(){
        this.spinner.show();
        this.newUserList = [];
        this.adminService.getNewUserList().subscribe( response => {
          console.log(response);
          this.newUserList = response['data'].reverse(); 
          this.spinner.hide();    
        });
    }

    getUserView(user_id) {
        console.log(user_id);
        this.spinner.show();
        this.adminService.getUserView(user_id).subscribe( response => {
            console.log(response);
            this.userId = response.data[0]['user_id'];
            this.userType = response.data[0]['user_type'];
            this.firstName = response.data[0]['first_name'];
            this.middleName = response.data[0]['middle_name'];
            this.lastName = response.data[0]['last_name'];
            this.mailId = response.data[0]['mail_id'];
            this.contactNo = response.data[0]['contact_no'];
            this.mobileNo = response.data[0]['mobile_no'];
            this.companyName = response.data[0]['user_company_name'];
            this.tradeName = response.data[0]['user_trade_name'];
            this.designation = response.data[0]['designation'];
            this.state = response.data[0]['user_state_name'];
            this.applicantStatus = response.data[0]['application_status'];
            this.membershipId = response.data[0]['membership_id'];
            this.membershipStatus = response.data[0]['membership_status'];
            this.pphoto = response.data[0]['upload_profile'];
            this.spinner.hide();    
        });
    }

    memberNotify(userId) {
        // this.userId;
        console.log(userId);
        // userId
        this.adminService.postMemberNotify(userId).subscribe(res => {
          
          console.log(res);
          swal.fire(
            'success!',
            'Notification Sent Successfully',
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
