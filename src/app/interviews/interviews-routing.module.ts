import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InterviewsComponent } from './interviews.component';
import { InterviewDetailComponent } from './interview-detail/interview-detail.component';

export const interviewsRoutes: Routes = [
  { path: '', component: InterviewsComponent, children: [
    { path: ':id', component: InterviewDetailComponent },
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(interviewsRoutes)
  ],
  exports: [RouterModule]
})
export class InterviewsRoutingModule {}
