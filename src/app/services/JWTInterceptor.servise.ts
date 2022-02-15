import { Observable } from 'rxjs';
import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import {Store} from "@ngrx/store";
import {iUser} from "../state/modeles/auth.modeles";

@Injectable()
export class JWTInterceptor implements HttpInterceptor {

  user$: any;

  constructor(private store: Store<{ user: iUser }>) {
    this.user$ = store.select('user');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    let token:string = '';
    this.user$.subscribe((data:iUser)=>{
      token = typeof (data.accessToken) == "string"? data.accessToken : "";
    })
    req = req.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'authorization': token
      }
    });

    return next.handle(req);

  }
}
