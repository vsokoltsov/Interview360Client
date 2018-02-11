import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumesComponent } from './resumes.component';
import { ResumeFormComponent } from './resume-form/resume-form.component';
import { ResumesDetailComponent } from './resumes-detail/resumes-detail.component';
import { WorkplacesFormComponent } from './workplaces/workplaces-form/workplaces-form.component';
import { ContactFormComponent } from './contacts/contact-form/contact-form.component';

export const resumesRoutes: Routes = [
 { path: '', component: ResumesComponent },
 { path: 'new', component: ResumeFormComponent },
 { path: 'new/workplaces', component: WorkplacesFormComponent },
 { path: 'new/contacts', component: ContactFormComponent },
 { path: ':id', component: ResumesDetailComponent },
 { path: ':id/edit', component: ResumeFormComponent },
 { path: ':id/edit/workplaces', component: WorkplacesFormComponent },
 { path: ':id/edit/contacts', component: ContactFormComponent }
];


@NgModule({
  imports: [
    RouterModule.forChild(resumesRoutes)
  ],
  exports: [RouterModule]
})
export class ResumesRoutingModule {}
