import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from 'src/app/interfaces/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  id!: number;
  accountForm!: FormGroup;
  //person!: User;

  constructor(private route: ActivatedRoute, private router: Router, private servicio:LoginService) {}
  
  datosUser!: User;

  ngOnInit(): void {
    let User = this.route.snapshot.paramMap.get('idUser');
    let token = this.servicio.isAuth();
    this.servicio.getSingleUser(User).subscribe(data => {
      console.log(data)
    })
  }

  get f(){
    return this.accountForm.controls;
  }

  submit(){
    console.log(this.accountForm.value);
    this.servicio.getSingleUser(this.accountForm.value).subscribe(res =>{
      console.log('User updated successfully');
      this.router.navigateByUrl('/account')
    })
  }

  delete(){}

}
