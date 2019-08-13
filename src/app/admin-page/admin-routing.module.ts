import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import {AdminPageComponent} from "./admin-page.component";
import {ChangeProductsComponent} from "./change-products/change-products.component";
import {AuthGuard} from "../services/auth.guard";


const AdminRoutes: Routes = [
  {path: '', component: AdminPageComponent, children: [
      {path: 'change', canActivate: [AuthGuard], component: ChangeProductsComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(AdminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
