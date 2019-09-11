
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ResetPasswordComponent} from "./reset-password.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ChangeLinkComponent } from './change-link/change-link.component';
import {ResetPasswordRoutingModule} from "./reset-password-routing.module";

@NgModule({
  declarations: [
    ResetPasswordComponent,
    ChangeLinkComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ResetPasswordRoutingModule
  ]
})
export class ResetPasswordModule { }
