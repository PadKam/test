import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {iHttp} from "../../state/modeles/http.modeles";
import {Observable} from "rxjs";
import {alertErrorDisabled, errorHttp} from "../../state/actions/http.action";
import {icon} from "../../../assets/images";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {

  constructor(private router:Router,
              private storeHttp: Store<{http:iHttp}>) {
    this.errorHttp$ = this.storeHttp.select('http');
  }

  errorHttp$:Observable<iHttp>;
  iconLock = icon.lock;


  activLink = this.router.url == "/registration" ? true : false;

  onActiveLink(link: string){
    this.activLink = link == "/registration" ? true : false;
  }

  closeAlert(){
    this.storeHttp.dispatch(alertErrorDisabled());
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    takeUntil(this.errorHttp$)
  }

}
