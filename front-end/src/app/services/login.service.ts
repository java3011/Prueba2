import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

import { Observable } from 'rxjs';

import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'http://localhost:3001';  

  constructor(private http: HttpClient, private jwthelp: JwtHelperService, private route:Router) {}

  singin(user:any){
    return this.http.post(`${this.apiUrl}/user/signin`,user);
  }

  isAuth():boolean{
    const token = localStorage.getItem('token');
    if(this.jwthelp.isTokenExpired(token) || !localStorage.getItem('token')){
      return false;
    }
    return true;
  }
  
  public verifyLooged(): boolean {
    const token = localStorage.getItem('token');
    //Si existe token return true caso contrario va al inicio token ?  true : false
    return !!token;
  }

  public logOut(){
    localStorage.removeItem('token');
    this.route.navigate(['']);
  }
  
  getSingleUser(id:any): Observable<User>{
    let direccion = this.apiUrl + "users?id=" + id;
    return this.http.get<User>(direccion);
  }

}
