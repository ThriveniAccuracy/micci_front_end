import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';

@Component({
  selector: 'app-admin-feedback',
  templateUrl: './admin-feedback.component.html',
  styleUrls: ['./admin-feedback.component.css']
})
export class AdminFeedbackComponent implements OnInit {

  feedbackList;
  membership_id_f:string;
  constructor(private adminService: AdminService,
    private myBuilder: FormBuilder,
    private spinner:NgxSpinnerService,
    private router: Router) { }

  ngOnInit() {
    this.getFeedbacks();
  }


  getFeedbacks(){
    this.spinner.show();
    this.feedbackList = [];
    this.adminService.getFeedbackList().subscribe( response => {
      console.log(response);
      this.feedbackList = response; 
      this.spinner.hide();    
    })
  }

}
