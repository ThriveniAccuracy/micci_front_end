import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-applicant',
  templateUrl: './applicant.component.html',
  styleUrls: ['./applicant.component.css']
})
export class ApplicantComponent implements OnInit {
  activeLink:Boolean
  activeLink1:Boolean
  activeLink2:Boolean
  activeLink3:Boolean
  activeLink4:Boolean
  activeLink5:Boolean
  constructor(private router: Router) {  }

  ngOnInit() {
    // console.log(this.router.url)
    if(this.router.url === '/dashboard') {
      this.activeLink = true
    }
    else if(this.router.url === '/app-profile' || this.router.url === '/allMemberList') {
      this.activeLink1 = true
    }
    else if(this.router.url === '/membershipForm' || this.router.url === '/app-details' || this.router.url === '/certi-table') {
      this.activeLink2 = true
    }
    else if(this.router.url === '/app-notes' || this.router.url === '/invoice-table' || this.router.url === '/payment' || this.router.url === '/receipt-table') {
      this.activeLink3 = true
    }
    else if(this.router.url === '/book-event' ) {
      this.activeLink4 = true
    }
    else if(this.router.url === '/app-feedback' ) {
      this.activeLink5 = true
    }
  }
  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user_type");
    sessionStorage.removeItem("userdata");
    sessionStorage.clear();
    this.router.navigate(["app-signIn"]);
  }
}
