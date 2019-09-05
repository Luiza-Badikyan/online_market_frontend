import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./services/auth.guard";
import Roles from "./constants/roles";
import {AuthLoadGuardGuard} from "./services/auth-load-guard.guard";

const adminRoles = {roles: [Roles.ADMIN.name]};
const userRoles = {roles: [Roles.USER.name]};


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', canActivate: [AuthGuard], loadChildren: './profile/profile.module#ProfileModule', data: userRoles},
  {path: 'admin',
    canLoad: [AuthLoadGuardGuard],
    data: adminRoles,
    loadChildren: './admin-page/admin.module#AdminModule'
    // loadChildren: () => import(`./admin-page/admin.module`).then(m => m.AdminModule)
  },
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
