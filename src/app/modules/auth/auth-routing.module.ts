import { NgModule } from "@angular/core";
import {Routes, RouterModule} from '@angular/router';

import {AuthComponent} from "./auth.component";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";

const router:Routes = [
  {path: '', component: AuthComponent, children:[
      {path: 'login', component: LoginComponent},
      {path: 'registration', component: RegistrationComponent},
      {path: '', redirectTo: 'registration', pathMatch: 'full'}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule]
})

export class AuthRouting{

}
