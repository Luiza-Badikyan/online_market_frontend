import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import {AdminPageComponent} from "./admin-page.component";
import {ChangeProductsComponent} from "./change-products/change-products.component";
import {AuthGuard} from "../services/auth.guard";

import Roles from './../constants/roles';
import {AuthLoadGuardGuard} from "../services/auth-load-guard.guard";
import {DatatableComponent} from "./datatable/datatable.component";
import {UsersComponent} from "./users/users.component";
const adminRoles = {roles: [Roles.ADMIN.name]};

const AdminRoutes: Routes = [
  {path: '', canActivate: [AuthLoadGuardGuard], data: adminRoles, component: AdminPageComponent, children: [
      {path: 'change', component: ChangeProductsComponent},
    ]},
  // {path: 'users', component: DatatableComponent},
  {path: 'users', component: UsersComponent},

];

@NgModule({
  imports: [RouterModule.forChild(AdminRoutes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
