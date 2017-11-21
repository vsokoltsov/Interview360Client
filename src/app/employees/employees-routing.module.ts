import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeesComponent } from './employees.component';
import { EmployeesEmptyComponent } from './employees-empty/employees-empty.component';
import { EmployeesFormComponent } from './employees-form/employees-form.component';
import { EmployeesDetailComponent } from './employees-detail/employees-detail.component';
import { EmployeeUpdateFormComponent } from './employee-update-form/employee-update-form.component';

export const employeesRoutes: Routes = [
  { path: '', component: EmployeesComponent, children: [
    { path: '', component: EmployeesEmptyComponent },
    { path: 'new', component: EmployeesFormComponent, pathMatch: 'full' },
    { path: ':id', component: EmployeesDetailComponent },
    { path: ':id/edit', component: EmployeeUpdateFormComponent }
  ] }
];

@NgModule({
  imports: [
    RouterModule.forChild(employeesRoutes)
  ],
  exports: [RouterModule]
})
export class EmployeesRoutingModule {  }
