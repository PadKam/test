import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotpageComponent} from "./components/notpage/notpage.component";

const routes: Routes = [
  {path: '404', component: NotpageComponent},
  {path: '', loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule)},
  {path: 'catalog',
    loadChildren: () => import("./modules/catalog/catalog.module").then(m => m.CatalogModule)},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
