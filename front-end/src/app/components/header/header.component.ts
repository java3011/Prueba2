import { Component, OnInit } from '@angular/core';
import { Cases } from 'src/app/interfaces/cases';
import { CaseService } from 'src/app/services/case.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private log: LoginService, private cas:CaseService) { }
  
  find: string = '';
  caseList:string = '';

  ngOnInit(): void {
  }
  
  onLogOut():void{
    this.log.logOut();
  }
  
  isAut():boolean{
    if(!this.log.isAuth()){
      return false;
    }
    return true
  }

}
