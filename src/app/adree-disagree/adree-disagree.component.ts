import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { MembershipService } from '../services/membership.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-adree-disagree',
  templateUrl: './adree-disagree.component.html',
  styleUrls: ['./adree-disagree.component.css']
})
export class AdreeDisagreeComponent implements OnInit {

  constructor(private membershipService: MembershipService, private router: Router) { }

  ngOnInit() {
  }

  reload(){
    this.router.navigate(['membershipForm']);
  }
   
  aggree(){
  
     


        swal.fire(
        'success!',
        'Thank you your membership submitted successfully!!',
        'success'
        ); 
        this.router.navigate(['dashboard']);
  
      
      
    }

}