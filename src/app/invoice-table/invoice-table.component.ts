import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsService } from '../services/accounts.service';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import {Location} from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-invoice-table',
  templateUrl: './invoice-table.component.html',
  styleUrls: ['./invoice-table.component.css']
})
export class InvoiceTableComponent implements OnInit {
  dataList:any[];
  invoiceNumber;
  membership_id_f:any;
  filterData:any;
  sigdisplay1 = 'none';
  uploadReceipt:FormGroup;
  url:any;
  constructor(private accountsService: AccountsService,private myBuilder: FormBuilder,
    private spinner:NgxSpinnerService,private _location: Location,
    private router: Router) { }

  ngOnInit() {
      this.getInvoiceList();
      this.uploadReceipt = this.myBuilder.group({
        userId: ['', [Validators.required]],
        invoiceNo: ['', [Validators.required]],
        receiptNo: ['', [Validators.required]],
        uploadDoc: ['', [Validators.required]],
    });
  }

  showuploadRModal() {
    this.sigdisplay1 = 'block';
    }
hideuploadRModal() {
    this.sigdisplay1 = 'none';
    this.getInvoiceList();
}


  getInvoiceList(){
    this.dataList = [];
    this.spinner.show();
    this.accountsService.getInvoiceList().subscribe( response => {
      console.log(response.data);
        if(response.status === false) { 
            this.spinner.hide();
            swal.fire(
                'Alert!',
                "You don't have any invoices currently!!",
                'error'
            );
            this._location.back();
            
        } else {

            this.dataList = response['data'];
            this.filterData = response['data'];
            this.spinner.hide();
        }
    })
 }

 Pay(value){
console.log(value)
localStorage.setItem("activeinvoiceForPaymentt",value.invoice_no);
    this.router.navigate(["payment/" + value.total_amount]);

 }

 applyFilter(event:string) {
    let filterValueLower = event;
    console.log(filterValueLower);
    if(event === "null" ) {
        this.dataList = this.filterData;
    } else  if(event === "Pending" ) {
        this.dataList  = this.filterData.filter((id) => id.payment_particulars === 'Pending')
        console.log(this.dataList);
    } else {
        console.log(event)
       this.dataList  = this.filterData.filter((id) => id.payment_particulars === event)
       console.log(this.dataList)
    }

}

onSelectFile(event){
    console.log(event.target.files.length);
    console.log(event.target.files);
    if (event.target.files.length > 0) {
      this.url = event.target.files
      console.log(this.url);
    }
}

showUploadModal(data) {
    console.log(data);
    // console.log(member_id);
    this.uploadReceipt.controls['invoiceNo'].patchValue(data.invoice_no);
    this.uploadReceipt.controls['userId'].patchValue(data.user_id);
    this.showuploadRModal();
}

onSubmitUpload(model: FormGroup) {
    console.log(model.value);
    console.log(this.url);
    const formData = new FormData();
    for (let img of this.url) {
      console.log(img);
      formData.append('uploadDoc', img);
    }
    formData.append('userId', model.value.userId);
    formData.append('invoiceNo', model.value.invoiceNo);
    formData.append('receiptNo', model.value.receiptNo);
    console.log(formData)
    this.accountsService.postUploadReceipt(formData).subscribe(res => {
        console.log(res);
        swal.fire(
          'success!',
          'Receipt upload Successfully',
          'success'
        ).then(function () {
          // this.getCreatedEvents();
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
