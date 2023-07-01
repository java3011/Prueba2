import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterService implements HttpInterceptor{

  intercept(req:any, next:any){
    const token = localStorage.getItem('token');
    const tokenHe = req.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(tokenHe);
  }

  constructor() { }
}
