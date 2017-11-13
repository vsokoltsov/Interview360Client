import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeesComponent } from './employees.component';

export const employeesRoutes: Routes = [
  { path: '', component: EmployeesComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(employeesRoutes)
  ],
  exports: [RouterModule]
})
export class EmployeesRoutingModule {  }
