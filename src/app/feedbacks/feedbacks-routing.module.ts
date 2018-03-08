import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FeedbacksComponent } from './feedbacks.component';

export const feedbacksRoutes: Routes = [
  { path: '', component: FeedbacksComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(feedbacksRoutes)
  ],
  exports: [RouterModule]
})
export class FeedbacksRoutingModule {}
