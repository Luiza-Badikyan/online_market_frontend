import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ResetPasswordComponent } from "./reset-password.component";
import { ChangeLinkComponent } from "./change-link/change-link.component";
import { TokenGuard } from "../services/token.guard";


const ResetRoutes: Routes = [
  // {path: 'link', component: ChangeLinkComponent,pathMatch: 'full'},
  {path: 'link', canActivate: [TokenGuard], component: ChangeLinkComponent},
  {path: '', component: ResetPasswordComponent},
];

// http://localhost:4200/profile/reset_password/link/$2a$10$EzhUwuZSQqGs8dwekEPXEu
@NgModule({
  imports: [
    RouterModule.forChild(ResetRoutes),
  ],
  exports: [
    RouterModule
  ]
})
export class ResetPasswordRoutingModule { }
