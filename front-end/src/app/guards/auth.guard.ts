import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth:LoginService, private route : Router){}

  canActivate():boolean{
    
    if(!this.auth.isAuth()){
      console.log('Token invalido o expirado');
      this.route.navigate(['login']);
      return false;
    }
    return true;
  }
  
}
