import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxSvgIconModule } from 'ngx-svg-icon';
import { DpDatePickerModule } from 'ng2-date-picker';

import { ResumesRoutingModule } from './resumes-routing.module';
import { ResumesComponent } from './resumes.component';
import { ResumeFormComponent } from './resume-form/resume-form.component';
import { AutocompleteModule } from '../shared/autocomplete/autocomplete.module';
import { ResumesItemComponent } from './resumes-item/resumes-item.component';
import { ResumesDetailComponent } from './resumes-detail/resumes-detail.component';

@NgModule({
  imports: [
    CommonModule,
    DpDatePickerModule,
    ReactiveFormsModule,
    NgxSvgIconModule,
    ResumesRoutingModule,
    AutocompleteModule
  ],
  declarations: [
    ResumesComponent,
    ResumeFormComponent,
    ResumesItemComponent,
    ResumesDetailComponent
  ]
})
export class ResumesModule {}
