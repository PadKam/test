import { NgModule } from "@angular/core";
import {Routes, RouterModule} from '@angular/router';

import {CatalogComponent} from "./catalog.component";
import {AccountComponent} from "./account/account.component";

const router:Routes = [

  {path: '', component: CatalogComponent, children:[
      {path: '', redirectTo: 'account', pathMatch: 'full'},
      {path: 'account', component: AccountComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(router)],
  exports: [RouterModule]
})

export class CatalogRouting{

}
