import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {

  link: FormGroup;
  submitted= false;


  constructor(private myBuilder: FormBuilder) { }

  get f() { return this.link.controls; }

  ngOnInit() {

    this.link=this.myBuilder.group({
      
      
      newPassword: ['', [Validators.required,Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required,Validators.minLength(6)]]

    });
  }
    onSubmit() {
      this.submitted= true;

      if(this.link.invalid){
        return;
      }
      alert('SUCCESS')
      
    }

  

}
