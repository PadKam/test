import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {RegistrationComponent} from "./registration/registration.component";
import {SharedModule} from "../../../assets/shared.modules";
import {AuthRouting} from "./auth-routing.module";
import {AuthComponent} from "./auth.component";
import {InputControlDirective} from "../../directives/inputControl.directive";
import { AlertErrorComponent } from './alert-error/alert-error.component';



@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegistrationComponent,
    InputControlDirective,
    AlertErrorComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AuthRouting,

  ]
})
export class AuthModule { }
