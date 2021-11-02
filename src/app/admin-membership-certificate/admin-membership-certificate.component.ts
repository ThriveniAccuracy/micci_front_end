import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas'; 

@Component({
  selector: 'app-admin-membership-certificate',
  templateUrl: './admin-membership-certificate.component.html',
  styleUrls: ['./admin-membership-certificate.component.css']
})
export class AdminMembershipCertificateComponent implements OnInit {

  filter: FormGroup;
  membershipList;
  tableView: Boolean = false;
  membershipId: string;
  issuedDate: string;
  companyName: string;
  downloadView: Boolean = false;

  constructor(private myBuilder: FormBuilder,
              private adminService: AdminService,
              private spinner:NgxSpinnerService,
              private router: Router) { }

  ngOnInit() {
    this.filter=this.myBuilder.group({      
      membership_id: [''],
      mem_cer_no: ['']

    });
  }

  filterForm( model: FormGroup){
    // console.log(model);
    this.spinner.show();
    this.membershipList = [];
    this.adminService.adminCertPageFilter( model.value).subscribe( response => {
      
      console.log(response);
      
     this.membershipList = response.data;
     this.tableView = true;
     this.spinner.hide();
    })
}

view(data){
  this.membershipId = "";
  this.issuedDate = "";
  this.companyName = "";
    console.log(data);
    this.membershipId = data.membership_id;
    this.issuedDate = data.cert_issued_date;
    this.companyName = data.member_company_name; 
    this.downloadView = true; 
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


