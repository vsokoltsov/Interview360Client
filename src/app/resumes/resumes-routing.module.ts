import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResumesComponent } from './resumes.component';

export const resumesRoutes: Routes = [
 { path: '', component:  ResumesComponent }
];


@NgModule({
  imports: [
    RouterModule.forChild(resumesRoutes)
  ],
  exports: [RouterModule]
})
export class ResumesRoutingModule {}
