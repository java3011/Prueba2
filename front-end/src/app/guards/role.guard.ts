import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authS: LoginService, public route: Router){}

  canActivate():boolean{
    if(!this.authS.isAuth()){
      console.log('Sin acceso');
      this.route.navigate(['admin']);
      return false;
    }
   // const exprec = route.data.expectedRole;
    //const token = localStorage.getItem('token');
    
    //const { roleID } = decode(token);
    //console.log(roleID);

   // if(roleID !== exprec){
   //   console.log('Usuario no autorizado para la vista');
      return true;
    //}

    //return true;
  }
  
}
