import { Component, OnInit } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { AccountsService } from '../services/accounts.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormService } from '../services/form.service';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  dataList:any[];
  dataAddList: any[];
  addressData;
  currentyear: any;
    nextyear:any;
  constructor(private accountsService: AccountsService, private spinner:NgxSpinnerService,
              private formService: FormService,
              private location: Location, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.url[1].path);
    this.getInvoiceData();
    this.getCompanyAddress();
    var datec = new Date();
    this.currentyear = datec.getFullYear();
    this.nextyear = datec.getFullYear()+1;
  }


  getCompanyAddress(){
    this.dataAddList = [];
    this.formService.getCompanyAddress().subscribe(res => {
      // console.log(res);
      this.dataAddList = res['data'];
      console.log(this.dataAddList);
      this.addressData = this.dataAddList[0].company_address;
      console.log(this.addressData);
      
    })
  }

goBack() {
    this.location.back();
  }  

  getInvoiceData(){
    this.dataList = [];
    this.spinner.show();
    let invoiceNumber = this.activatedRoute.snapshot.url[1].path;
    this.accountsService.getInvoiceData(invoiceNumber).subscribe(res => {
      // console.log(res.data);
      this.dataList = res['data'];
      console.log(this.dataList);
      this.spinner.hide();
    })
  }

  public downloadPdf(){
    html2canvas(document.getElementById('downloadView')).then(canvas => {
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jspdf('p', 'mm', 'a4');
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('certificate.pdf');
    });
  }
}
