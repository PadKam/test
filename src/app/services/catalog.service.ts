import { Injectable } from '@angular/core';
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Tools} from "../../../../angular-antools/src/app/interface";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  getPosts(){
    return this.http.get(environment.apiUrl+'posts' ).pipe(
      catchError(this.handleError<Tools[]>('posts', []))
    )
  }

  private handleError<T>(operation = 'operation', result?:T){
    return (error: any):Observable<T>=>{
      return of(result as T);
    }
  }
}

