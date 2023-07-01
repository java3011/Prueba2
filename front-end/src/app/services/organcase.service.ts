import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { OrganCase } from '../interfaces/organcase';
import { catchError } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class OrganCaseService {

  private apiUrl = "http://localhost:3001/organcase/";

  constructor(private http:HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  createOrganCase(organcase:any): Observable<OrganCase>{ 
    return this.http.post<OrganCase>(this.apiUrl + "InsertOrganCase", JSON.stringify(organcase), this.httpOptions)
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