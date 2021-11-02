import { Component, OnInit } from '@angular/core';
import { AdminAccountsService } from '../services/adminAccounts.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-account-statement',
  templateUrl: './account-statement.component.html',
  styleUrls: ['./account-statement.component.css']
})
export class AccountStatementComponent implements OnInit {
  showModal: boolean;
  acccountStatement:FormGroup;
  statements:any = [];
  tableList:boolean = false


  amount: string;
  branch: string;
  company_name: string;
  created_date: string;
  invoice_number: string;
  membership_id: string;
  receipt_number: string;


  downloadView: Boolean = false;

  constructor(private router: Router, private accountsService:AdminAccountsService,
     private formBuilder:FormBuilder, private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.acccountStatement = this.formBuilder.group({
      membershipId:['', Validators.required],
      receiptNumber:['', Validators.required],
      invoiceNumber:['', Validators.required]
    });
  }

  
  onSubmit(model:FormGroup){
    this.spinner.show();
    this.statements = [];
    this.accountsService.getAccountStatement(model.value).subscribe(res => {
      // console.log(res);
      this.statements = res['data'];
      console.log(this.statements);
      if( this.statements.length > 0){
        this.tableList = true;
        this.spinner.hide();
      }
      
    })
  }



view(data){
  console.log(data)
  // this.membershipId = "";
  // this.issuedDate = "";
  // this.companyName = "";
  //   console.log(data);
  //   this.membershipId = data.membership_id;
  //   this.issuedDate = data.created_date;
  //   this.companyName = data.company_name; 


  this.amount = data.total_amount
  this.branch = data.branch_name
  this.company_name =data.member_company_name
  this.created_date = data.creation_date
  this.invoice_number = data.invoice_no
  this.membership_id = data.membership_id
  this.receipt_number = data.receipt_no
  this.downloadView = true; 
}
}
