import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeesRoutingModule
  ],
  declarations: [
    EmployeesComponent
  ]
})
export class EmployeesModule {}
