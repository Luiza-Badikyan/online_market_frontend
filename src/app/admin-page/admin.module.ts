
import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";
import {AdminPageComponent} from "./admin-page.component";
import {AdminRoutingModule} from "./admin-routing.module";
import {ChangeProductsComponent} from "./change-products/change-products.component";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AdminPageComponent,
    ChangeProductsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: []
})
export class AdminModule { }
