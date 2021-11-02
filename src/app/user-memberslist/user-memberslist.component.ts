import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { DatePipe } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { interval } from 'rxjs';
import { takeWhile } from 'rxjs/operators';


@Component({
  selector: 'app-user-memberslist',
  templateUrl: './user-memberslist.component.html',
  styleUrls: ['./user-memberslist.component.css']
})
export class UserMemberslistComponent implements OnInit {
    editorConfig = { editable: true, spellcheck: false, height: '10rem', minHeight: '5rem', placeholder: 'Type something. Test the Editor... ヽ(^。^)丿', translate: 'no' };
    membershipList: any[];
    membership_id_f:number;
    company_name_f:string;
    sigdisplay2 = 'none';
    filterData:any;
  
    messageSendingEvent: FormGroup;

    
    filter: FormGroup;
    statusChange: FormGroup;
    sendNotifivation: FormGroup;
    sendtomanager:FormGroup;
    membershipId;
    notifyMembershipId;
    filterClearBtn: Boolean = false;
    @ViewChild('autoShownModal', { static: false }) autoShownModal: ModalDirective;
    @ViewChild('notifyShownModal', { static: false }) notifyShownModal: ModalDirective;
  
    isModalShown = false;
    isNotifyModalShown = false;
    topicOthers = false;
  
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
  
    recentUserID = JSON.parse(sessionStorage.getItem("usermembership"))[0]['membership_id']
    reciverUserId
    messagedetails
    messageDatatomap: []
    constructor(
        private myBuilder: FormBuilder,
        private adminService: AdminService,
        private spinner:NgxSpinnerService,
        private router: Router,
        private datePipe: DatePipe,
        private httpService:HttpClient
    ) { }
  
    ngOnInit() {
       this.getMemberships();

       this.messageSendingEvent = this.myBuilder.group({
        messagedetails:[''],
        senderId: JSON.parse(sessionStorage.getItem("usermembership"))[0]['membership_id'],
        reciverId: ''
      });

    //   this.newFunction(this.reciverUserId)

    interval(10000)
    // .pipe(takeWhile(() => !stop))
    .subscribe(() => {
   
     console.log(this.reciverUserId)
     if(this.reciverUserId) {
        this.showMsg(this.reciverUserId)
     }else {
        console.log("======")
     }
  
    });
     
    }




    get f() {
        return this.messageSendingEvent.controls;
      }




      messageSent(model:FormGroup) {
        console.log(model.value)
        // console.log(JSON.parse(sessionStorage.getItem("usermembership"))[0]['membership_id'])
        // this.messageDatatomap.push(model.value)
        this.adminService.sendMessageToPerson(model.value).subscribe( res => {
        
            console.log(res)
          })



      }



    showViewModal() {
        this.sigdisplay2 = 'block';
    }
    hideViewModal() {
        this.sigdisplay2 = 'none';
        this.getMemberships();
    }
  
    showMsg(event) {
        console.log(event);  
        // this.reciverId = event
        this.messageSendingEvent.controls['reciverId'].patchValue(event);
        // this.notifyMembershipId = '';
        // this.isNotifyModalShown = true;
        // this.notifyMembershipId = data.membership_id;
            this.reciverUserId = event

            this.messageDatatomap = []
        this.adminService.getrecentMessages(event)
        .subscribe( res => {
        

            this.messageDatatomap = res['message'].reverse()
            console.log(this.messageDatatomap)
          })

    }


//  newFunction(event) {
//      console.log(event)
//         interval(1000 * 60).subscribe(x => {
//                this.showMsg(this.reciverUserId);
//              });
//              }



    
    hideMsgModal(): void {
        this.isNotifyModalShown = false;
    }
  


    photoView(event: string) {
      console.log(event)
      window.open(event, "_blank");
    }
  
    photoView1(event: string) {
      console.log(event)
      window.open(event, "_blank");
    }
  
    getViewModal(m_id) {
        console.log(m_id);
        this.spinner.show();
        this.adminService.getMembershipView(m_id).subscribe( response => {
            console.log(response);
            document.getElementById('withoutData').style.display="none";
            document.getElementById('withData').style.display="block";

            this.membership_id = response.data[0]['membership_id'];
            this.company_name = response.data[0]['company_name'];
            this.trade_name = response.data[0]['trade_name'];
            this.branch = response.data[0]['branch'];
            this.address1 = response.data[0]['address1'];
            this.address2 = response.data[0]['address2'];
            this.city = response.data[0]['city'];
            this.state = response.data[0]['state'];
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
            this.remarks = response.data[0]['remarks'];
            
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
            // this.filterClearBtn = false;
            // this.filter.reset();
        })
    }
  
  
  
   
}
