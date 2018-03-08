import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSvgIconModule } from 'ngx-svg-icon';
import { DpDatePickerModule } from 'ng2-date-picker';

import { FeedbacksRoutingModule } from './feedbacks-routing.module';
import { FeedbacksComponent } from './feedbacks.component';

@NgModule({
  imports: [
    CommonModule,
    DpDatePickerModule,
    ReactiveFormsModule,
    NgxSvgIconModule,
    FeedbacksRoutingModule
  ],
  declarations: [
    FeedbacksComponent
  ]
})
export class FeedbacksModule {}
