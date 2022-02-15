import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Tools} from "../../../../angular-antools/src/app/interface";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }


  regIn(data:any):Observable<any>{
    return this.http.post(environment.apiUrl + 'register', data).pipe(
      retry(3),
      catchError(this.handleError<Tools[]>('regIn', []))
    )
  }

  logIn(data:any):Observable<any>{
    return this.http.post(environment.apiUrl + 'login', data).pipe(
      retry(3),
      catchError(this.handleError<Tools[]>('LogIn', []))
    )
  }

  private handleError<T>(operation = 'operation', result?:T){
    return (error: any):Observable<T>=>{
      return of(result as T);
    }
  }
}

