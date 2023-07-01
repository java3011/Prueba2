import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SigninService } from 'src/app/services/signin.service'; 

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;

  constructor(public http:SigninService,private route:Router, private fb: FormBuilder){
    this.signinForm = this.fb.group({
      userName: ["",[Validators.required, Validators.maxLength(80)]],
      Email: ["",[Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.maxLength(80)]],
      userPassword: ["",[Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      Charge: ["",[Validators.maxLength(50)]]
    });
  }

  ngOnInit(): void {}
  
  get f(){
    return this.signinForm.controls;
  }

  submit(){
    
    this.http.create(this.signinForm.value).subscribe(res =>{
      console.log('User created successfully');
      this.route.navigate(['']);
    })
  }
}