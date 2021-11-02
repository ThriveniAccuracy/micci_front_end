import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-appover-nav',
  templateUrl: './appover-nav.component.html',
  styleUrls: ['./appover-nav.component.css']
})
export class AppoverNavComponent implements OnInit {

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
