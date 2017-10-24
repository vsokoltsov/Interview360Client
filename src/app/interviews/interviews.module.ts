import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSvgIconModule } from 'ngx-svg-icon';

import { InterviewsRoutingModule } from './interviews-routing.module';
import { InterviewsComponent } from './interviews.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxSvgIconModule,
    InterviewsRoutingModule
  ],
  declarations: [
    InterviewsComponent
  ]
})
export class InterviewsModule {}
