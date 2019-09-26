
import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { AdminPageComponent } from "./admin-page.component";
import { AdminRoutingModule } from "./admin-routing.module";
import { ChangeProductsComponent } from "./change-products/change-products.component";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from "@angular/material";
import { MatInputModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { FlexLayoutModule } from "@angular/flex-layout";
import { FileDropDirective, FileSelectDirective } from 'ng2-file-upload';
import { DatatableComponent } from './datatable/datatable.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSmartModalModule } from 'ngx-smart-modal';
import { SharedDatatableModule } from "../shared-datatable/shared-datatable.module";
import { UsersComponent } from './users/users.component';


@NgModule({
  declarations: [
    AdminPageComponent,
    ChangeProductsComponent,
    FileSelectDirective,
    FileDropDirective,
    DatatableComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
    MatGridListModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    FlexLayoutModule,
    NgxDatatableModule,
    NgxSmartModalModule.forRoot(),
    SharedDatatableModule
  ],
  providers: [],
  bootstrap: []
})
export class AdminModule { }
