import { NgModule } from '@angular/core';
import { NgxSvgIconModule } from 'ngx-svg-icon';
import { CommonModule } from '@angular/common';

import { BackButtonComponent }  from './back-button.component';

@NgModule({
  declarations: [
    BackButtonComponent
  ],
  imports: [
    CommonModule,
    NgxSvgIconModule
  ],
  exports: [
    BackButtonComponent
  ]
})
export class BackButtonModule {}
