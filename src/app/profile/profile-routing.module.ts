import { NgModule } from '@angular/core';
import {ProfileComponent} from "./profile.component";
import {RouterModule, Routes} from "@angular/router";
import {ChangeInfoComponent} from "./change-info/change-info.component";
import {ChangePasswordComponent} from "./change-password/change-password.component";


const ProfileRoutes: Routes = [
  {path: '', component: ProfileComponent},
  {path: 'change/:id', component: ChangeInfoComponent},
  {path: 'change-password', component: ChangePasswordComponent}
];

@NgModule({

  imports: [
    RouterModule.forChild(ProfileRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class ProfileRoutingModule { }
