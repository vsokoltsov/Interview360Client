import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumesComponent } from './resumes.component';
import { ResumeFormComponent } from './resume-form/resume-form.component';
import { ResumesDetailComponent } from './resumes-detail/resumes-detail.component';

export const resumesRoutes: Routes = [
 { path: '', component: ResumesComponent },
 { path: 'new', component: ResumeFormComponent },
 { path: ':id', component: ResumesDetailComponent }
];


@NgModule({
  imports: [
    RouterModule.forChild(resumesRoutes)
  ],
  exports: [RouterModule]
})
export class ResumesRoutingModule {}
