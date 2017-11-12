import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSvgIconModule } from 'ngx-svg-icon';
import { DpDatePickerModule } from 'ng2-date-picker';

import { InterviewsRoutingModule } from './interviews-routing.module';
import { InterviewsComponent } from './interviews.component';
import { InterviewListItemComponent } from './interview-list-item/interview-list-item.component';
import { InterviewDetailComponent } from './interview-detail/interview-detail.component';
import { InterviewFormComponent } from './interview-form/interview-form.component';
import { AutocompleteModule } from '../shared/autocomplete/autocomplete.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxSvgIconModule,
    InterviewsRoutingModule,
    DpDatePickerModule,
    AutocompleteModule
  ],
  declarations: [
    InterviewsComponent,
    InterviewListItemComponent,
    InterviewDetailComponent,
    InterviewFormComponent
  ],
  exports: [
    InterviewListItemComponent
  ]
})
export class InterviewsModule {}
