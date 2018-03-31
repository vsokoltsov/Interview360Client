import { NgModule } from '@angular/core';
import { NgxSvgIconModule } from 'ngx-svg-icon';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms'

import { OrderComponent } from './order/order.component';
import { SelectComponent } from './select/select.component';

@NgModule({
  declarations: [
    OrderComponent,
    SelectComponent
  ],
  imports: [
    CommonModule,
    NgxSvgIconModule,
    NgSelectModule,
    ReactiveFormsModule
  ],
  exports: [
    OrderComponent,
    SelectComponent
  ]
})
export class FiltersModule {}
