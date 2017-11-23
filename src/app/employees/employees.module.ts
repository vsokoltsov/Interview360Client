import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSvgIconModule } from 'ngx-svg-icon';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { EmployeesListItemComponent } from './employees-list-item/employees-list-item.component';
import { EmployeesEmptyComponent } from './employees-empty/employees-empty.component';
import { EmployeesFormComponent } from './employees-form/employees-form.component';
import { EmployeesDetailComponent } from './employees-detail/employees-detail.component';
import { ImageModule } from '../shared/image/image.module';
import { EmployeeUpdateFormComponent } from './employee-update-form/employee-update-form.component';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { UploaderModule } from '../shared/uploader/uploader.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EmployeesRoutingModule,
    NgxSvgIconModule,
    ImageModule,
    UploaderModule,
    FileUploadModule
  ],
  declarations: [
    EmployeesComponent,
    EmployeesListItemComponent,
    EmployeesEmptyComponent,
    EmployeesFormComponent,
    EmployeesDetailComponent,
    EmployeeUpdateFormComponent
  ],
  exports: [
    EmployeesListItemComponent
  ]
})
export class EmployeesModule {}
