import { Injectable } from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import { EMPTY, timer, Observable  } from 'rxjs';
import {map, mergeMap, catchError} from 'rxjs/operators';
import {logIn, registration, setToken, setUser, updateToken} from "../actions/auth.action";
import {AuthService} from "../../services/auth.service";
import {iUser} from "../modeles/auth.modeles";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {iHttp} from "../modeles/http.modeles";
import {alertTextInitial, errorHttp} from "../actions/http.action";

@Injectable()
export class AuthEffects {

  constructor(
    private actions$: Actions,
    private authServices: AuthService,
    private router:Router,
    private store: Store<{user:iUser}>,
    private storeHttp: Store<{http:iHttp}>
  ) {
    this.user$ = this.store.select('user');
  }
  user$: Observable<iUser>;

  setPassword$ = createEffect(() => this.actions$.pipe(
    ofType(logIn,registration),
    map(user => setUser( user )),
  ));

  loadUser$ = createEffect(() => this.actions$.pipe(
    ofType(logIn),
    mergeMap((user)=> this.authServices.logIn(user.user).pipe(
        map(data => {
          data.user.accessToken = data.accessToken;
          this.timerUpdateToken$().subscribe((data:iUser)=>{
            this.store.dispatch(updateToken({'user':data}))
          });
          timer(2000).subscribe(()=>this.router.navigate(['/catalog','account']));
          return setToken(data);
        }),
      catchError((err) => {
        this.storeHttp.dispatch(alertTextInitial({alertText:"Не верный Email или пароль"}));
        this.storeHttp.dispatch(errorHttp(err));
        return EMPTY;
        })
      )
    )
  ));

  updateToken$ = createEffect(()=> this.actions$.pipe(
    ofType(updateToken),
    mergeMap((user)=> this.authServices.logIn(user.user).pipe(
      map(data => {
        data.user.accessToken = data.accessToken;
        this.timerUpdateToken$().subscribe((data:iUser)=>{
          this.store.dispatch(updateToken({'user':data}))
        });
        return setToken(data);
      }),
      catchError((err) => {
        this.storeHttp.dispatch(errorHttp(err));
        return EMPTY;
      })
      )
    )
  ))

  registrationUser$ = createEffect(() => this.actions$.pipe(
    ofType(registration),
    mergeMap((user)=> {
      return this.authServices.regIn(user.user).pipe(
          map(data => {
            data.user.accessToken = data.accessToken;
            this.timerUpdateToken$().subscribe((data:iUser)=>{
              this.store.dispatch(logIn({'user':data}))
            });
            timer(2000).subscribe(()=>this.router.navigate(['/catalog','account']));
            return setToken(data);
          }),
          catchError((err) => {
            this.storeHttp.dispatch(alertTextInitial({alertText:"Email занят!"}));
            this.storeHttp.dispatch(errorHttp(err));
            return EMPTY;
          })
        )
      }
    )
  ));

  timerUpdateToken$() {

    return new Observable<iUser>(ob=>{
      let user:iUser;
      let time = 1000;
      this.user$.subscribe((data)=> {
        user = data;
        time = data.timeUpdateToken != undefined ? data.timeUpdateToken : 260000;
        setTimeout(()=>{
          ob.next(user)
          ob.complete();
        },time);
      });
    });


  }



}
