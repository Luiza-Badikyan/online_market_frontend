import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SharedDatatableComponent} from "./shared-datatable/shared-datatable.component";


const routes: Routes = [
  {path: '', component: SharedDatatableComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedDatatableRoutingModule { }
