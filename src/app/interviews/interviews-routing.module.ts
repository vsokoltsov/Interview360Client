import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InterviewsComponent } from './interviews.component';

export const interviewsRoutes: Routes = [
  { path: '', component: InterviewsComponent },
];

@NgModule({
  imports: [
    RouterModule.forChild(interviewsRoutes)
  ],
  exports: [RouterModule]
})
export class InterviewsRoutingModule {}
