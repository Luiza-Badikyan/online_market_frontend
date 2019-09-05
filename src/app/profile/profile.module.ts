
import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileComponent} from "./profile.component";
import {ProfileRoutingModule} from "./profile-routing.module";
import { ChangeInfoComponent } from './change-info/change-info.component';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [
    ProfileComponent,
    ChangeInfoComponent,
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule
  ]
})
export class ProfileModule { }
