import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { IndexPrescription } from '../interfaces/indexprescription';
import { catchError } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class IndexPrescriptionService {

  private apiUrl = "http://localhost:3001/indexprescription/";

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  createIndexPrescription(indexprescription:any): Observable<IndexPrescription>{ 
    return this.http.post<IndexPrescription>(this.apiUrl + "InsertIndexPrescription", JSON.stringify(indexprescription), this.httpOptions)
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