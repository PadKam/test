import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import {CatalogRouting} from "./catalog-roiting.module";
import {AccountComponent} from "./account/account.component";



@NgModule({
  declarations: [
    CatalogComponent,
    AccountComponent
  ],
  imports: [
    CommonModule,
    CatalogRouting
  ]
})
export class CatalogModule { }
