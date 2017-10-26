import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSvgIconModule } from 'ngx-svg-icon';

import { InterviewsRoutingModule } from './interviews-routing.module';
import { InterviewsComponent } from './interviews.component';
import { InterviewListItemComponent } from './interview-list-item/interview-list-item.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxSvgIconModule,
    InterviewsRoutingModule
  ],
  declarations: [
    InterviewsComponent,
    InterviewListItemComponent
  ]
})
export class InterviewsModule {}
