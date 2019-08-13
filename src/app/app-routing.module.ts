import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageComponent} from "./home-page/home-page.component";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {ProfileComponent} from "./profile/profile.component";
import {AuthGuard} from "./services/auth.guard";


const routes: Routes = [
  {path: '', component: HomePageComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', /*canActivate: [AuthGuard],*/ component: ProfileComponent},
  {path: 'admin', loadChildren: () => import(`./admin-page/admin.module`).then(m => m.AdminModule) },
  {path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
