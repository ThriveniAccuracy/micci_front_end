import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {

    user_type :any;
  constructor(private router: Router) { }

  ngOnInit() {
    this.user_type = localStorage.getItem("user_type")
    // if( localStorage.getItem("user_type") === 'admin') {
        
    // } 
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user_type");
    sessionStorage.removeItem("userdata");
    sessionStorage.clear();
    this.router.navigate(["app-signIn"]);
  }

}
