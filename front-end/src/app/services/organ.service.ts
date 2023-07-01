import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Organ } from '../interfaces/organ';
import { catchError } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class OrganService {

  private apiUrl = "http://localhost:3001/organ/";

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  createOrgan(organ:any): Observable<Organ>{ 
    return this.http.post<Organ>(this.apiUrl + "InsertOrgan", JSON.stringify(organ), this.httpOptions)
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