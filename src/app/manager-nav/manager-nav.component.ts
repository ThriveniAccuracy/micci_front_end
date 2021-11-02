import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager-nav',
  templateUrl: './manager-nav.component.html',
  styleUrls: ['./manager-nav.component.css']
})
export class ManagerNavComponent implements OnInit {

  
    constructor(private router: Router) { }

    ngOnInit() {
    }
  
    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user_type");
      sessionStorage.removeItem("userdata");
      sessionStorage.clear();
      this.router.navigate(["app-signIn"]);
    }

}
