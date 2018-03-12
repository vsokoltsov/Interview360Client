import { NgModule } from '@angular/core';
import { NgxSvgIconModule } from 'ngx-svg-icon';
import { CommonModule } from '@angular/common';

import { OrderComponent } from './order/order.component';

@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    NgxSvgIconModule
  ],
  exports: [
    OrderComponent
  ]
})
export class FiltersModule {}
