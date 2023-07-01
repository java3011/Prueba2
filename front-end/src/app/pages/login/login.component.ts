import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  loginForm: FormGroup;
 
  //user = {
   // Email: '',
   // userPassword: ''
  //}

  constructor(private login: LoginService, private router: Router, private fb2:FormBuilder) {
    this.loginForm = this.fb2.group({
      Email: ["",[Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"), Validators.maxLength(80)]],
      userPassword: ["",[Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      
    });
  }
  
  ngOnInit(): void {}

  get f(){
    return this.loginForm.controls;
  }

  logIn(){
    console.log(this.loginForm.value);
    this.login.singin(this.loginForm.value).subscribe( (res:any) => {
      console.log(res);
      localStorage.setItem('token', res.token);
      this.router.navigate(['private']);
    })
  }

}
