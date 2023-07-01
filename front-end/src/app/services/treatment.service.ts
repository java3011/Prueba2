import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Treatment } from '../interfaces/treatment';
import { catchError } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  private apiUrl = "http://localhost:3001/treatment/";

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  createTreatment(treatment:any): Observable<Treatment>{ 
    return this.http.post<Treatment>(this.apiUrl + "InsertTreatment", JSON.stringify(treatment), this.httpOptions)
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