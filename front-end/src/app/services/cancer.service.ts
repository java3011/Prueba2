import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Cancer } from '../interfaces/cancer';
import { catchError } from 'rxjs/operators'; 


@Injectable({
  providedIn: 'root'
})
export class CancerService {

  private apiUrl = "http://localhost:3001/cancer/";

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  createCancer(cancer:any): Observable<Cancer>{ 
    return this.http.post<Cancer>(this.apiUrl + "InsertCancer", JSON.stringify(cancer), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  errorHandler(error:any){
    let errorMessage = '';
   if(error.error instanceof ErrorEvent){
      errorMessage = error.error.message;
    }else{
      errorMessage = `Error Code: $(error.status) \nMessage: $(error.message)`;
    }
    return throwError(errorMessage);
 }

}