import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import swal from 'sweetalert2';
import { SignService } from '../services/sign.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

    token : any;
  constructor(private adminService: SignService,
    private spinner:NgxSpinnerService,
    private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
    this.token = this.route.snapshot.paramMap.get('id');
    this.signin()
  }

  signin() {

    // var token = localStorage.getItem("token");
    this.token = this.route.snapshot.paramMap.get('id');
    console.log(this.token);

    this.adminService.postSendToken(this.token).subscribe(res => {
        console.log(res);
        this.router.navigate(["app-signIn"]);
        // swal.fire(
        //   'success!',
        //   'Membership Rejected Successfully',
        //   'success'
        // ).then(function () {
        //   // this.getCreatedEvents();
        //   location.reload();
        // });
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
