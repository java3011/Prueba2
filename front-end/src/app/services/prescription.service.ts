import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Prescription } from '../interfaces/prescription';
import { catchError } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  private apiUrl = "http://localhost:3001/prescription/";

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  createPrescription(prescription:any): Observable<Prescription>{ 
    return this.http.post<Prescription>(this.apiUrl + "InsertPrescription", JSON.stringify(prescription), this.httpOptions)
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