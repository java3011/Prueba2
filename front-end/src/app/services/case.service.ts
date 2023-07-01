import { Injectable } from '@angular/core';
import  {HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Cases } from '../interfaces/cases';
import { catchError } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class CaseService {

  private apiUrl = "http://localhost:3001/case";
  
  constructor(private http:HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',

    })
  }

  getCase():Observable<any>{
    return this.http.get(this.apiUrl + "/ListarCases");
  }

  createCase(cases:any): Observable<Cases>{ 
    console.log(cases);
    return this.http.post<Cases>(this.apiUrl + "/InsertCase", JSON.stringify(cases), this.httpOptions)
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
 getAll(filter:any){
  return this.http.get(`${this.apiUrl}/GetAll/${filter}`)
} 

}