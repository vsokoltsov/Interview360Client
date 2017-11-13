import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeesComponent } from './employees.component';
import { EmployeesEmptyComponent } from './employees-empty/employees-empty.component';

export const employeesRoutes: Routes = [
  { path: '', component: EmployeesComponent, children: [
      { path: '', component: EmployeesEmptyComponent },
  ] }
];

@NgModule({
  imports: [
    RouterModule.forChild(employeesRoutes)
  ],
  exports: [RouterModule]
})
export class EmployeesRoutingModule {  }
