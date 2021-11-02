import { Component, OnInit } from '@angular/core';
import { FormService } from '../services/form.service';
import { ActivatedRoute  } from '@angular/router';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {
  dataList:any[];
  constructor(private http:FormService, private activatedRoute:ActivatedRoute,
    private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.getNoticeData();
  }

  getNoticeData(){
    this.spinner.show();
    this.dataList = [];
    let noticeId = this.activatedRoute.snapshot.url[1].path;
    this.http.renewalNoticeView(noticeId).subscribe(res => {
    //   console.log(res.data);
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
