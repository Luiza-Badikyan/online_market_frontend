import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedDatatableComponent } from './shared-datatable/shared-datatable.component';
import { SharedDatatableRoutingModule } from "./shared-datatable-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgxSmartModalModule } from "ngx-smart-modal";
import { ToastrModule } from "ngx-toastr";



@NgModule({
  declarations: [SharedDatatableComponent],
  imports: [
    CommonModule,
    SharedDatatableRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDatatableModule,
    NgxSmartModalModule.forRoot(),
    ToastrModule.forRoot(),
  ],
  exports: [SharedDatatableComponent]
})
export class SharedDatatableModule { }
