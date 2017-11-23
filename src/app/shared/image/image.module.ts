import { NgModule } from '@angular/core';
import { NgxSvgIconModule } from 'ngx-svg-icon';
import { CommonModule } from '@angular/common';

import { ImageComponent } from './image.component';

@NgModule({
  declarations: [
    ImageComponent
  ],
  imports: [
    CommonModule,
    NgxSvgIconModule
  ],
  exports: [
    ImageComponent
  ]
})
export class ImageModule {}
