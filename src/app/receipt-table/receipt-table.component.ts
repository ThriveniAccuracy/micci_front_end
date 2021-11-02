
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsService } from '../services/accounts.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import {Location} from '@angular/common';

@Component({
  selector: 'app-receipt-table',
  templateUrl: './receipt-table.component.html',
  styleUrls: ['./receipt-table.component.css']
})
export class ReceiptTableComponent implements OnInit {
  receiptList:any[];

  constructor(private accountsService: AccountsService,
    private spinner:NgxSpinnerService,private _location: Location,
    private router: Router) { }

  ngOnInit() {
      this.getReceiptList();
  }


  getReceiptList(){
    this.receiptList = [];
    this.spinner.show();
    this.accountsService.getReceiptList().subscribe( response => {
      console.log(response);
      if(response.status === false) {
        this.spinner.hide();
        swal.fire(
            'Alert!',
            "You don't have any receipts currently!!",
            'error'
        );
        this._location.back();

    } else {

        this.receiptList = response['data'];
        this.spinner.hide();
    }

    })
 }

}
