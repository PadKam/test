import {Component, OnDestroy, OnInit} from '@angular/core';
import {timer} from "rxjs";
import {takeUntil} from "rxjs/operators";

import {FormBuilder, Validators} from "@angular/forms";
import {icon} from "../../../../assets/images";
import {loadingTrigger} from "../../../animations/loading.animation";
import {AuthService} from "../../../services/auth.service";
import { Store } from '@ngrx/store';
import {iUser} from "../../../state/modeles/auth.modeles";
import {registration} from "../../../state/actions/auth.action";
import {iHttp} from "../../../state/modeles/http.modeles";
import {alertErrorDisabled, preLoaderStart, preLoaderStop} from "../../../state/actions/http.action";


@Component({
  selector: 'auth-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  animations:[loadingTrigger]
})
export class RegistrationComponent implements OnInit, OnDestroy{

  constructor(private fb:FormBuilder,
              private authService:AuthService,
              private store: Store<{users:iUser}>,
              private storeHttp: Store<{http:iHttp}>) {
  }


  ngOnInit(): void {

  }

  helpWhenInputIsInFocus = new Map([
    ['login', false],
    ['email',false],
    ['password',false]
  ]);

  iconPassword = icon['eye'];
  visiblePas = 'password';

  iconLoading = icon['loading'];
  visibleLoad$ = this.storeHttp.select('http');

  stateRotation = 'start';
  startRotation(){
    this.stateRotation = this.stateRotation == 'start' ? 'end' : 'start';
  }

  regForm = this.fb.group({
    'user': this.fb.group({
      'email': ['', [Validators.required, Validators.email]],
      'login': ['', [Validators.required, Validators.minLength(6)]],
      'password': ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^\w*[A-Z]+\w*$/)]]
    })
  });

  visiblePassword(){
    if(this.visiblePas == 'text'){
      this.visiblePas = 'password';
      this.iconPassword = icon['eye'];
    }else{
      this.visiblePas = 'text';
      this.iconPassword = icon['eyeClose'];
    }
  }
  showHelp(controlName:string): void{
    if(this.helpWhenInputIsInFocus.get(controlName) !== undefined)
      this.helpWhenInputIsInFocus.set(controlName,!this.helpWhenInputIsInFocus.get(controlName));
  }

  onSubmit(){
    this.store.dispatch(registration(this.regForm.value));
    this.storeHttp.dispatch(preLoaderStart());
    this.visibleLoad$.subscribe((data)=>{
      if(data.alertError === true){
        if(data.preLoader === true)
          this.storeHttp.dispatch(preLoaderStop());
        timer(2000).subscribe(()=>{
          this.storeHttp.dispatch(alertErrorDisabled())
        });
      }
    });
  }
  ngOnDestroy(): void {
    this.storeHttp.dispatch(preLoaderStop());
    takeUntil(this.visibleLoad$);
  }
}
