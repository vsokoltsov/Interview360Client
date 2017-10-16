import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VacanciesComponent } from './vacancies.component';

export const vacanciesRoutes: Routes = [
  { path: '', component: VacanciesComponent, children: [

  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(vacanciesRoutes)
  ],
  exports: [RouterModule]
})
export class VacanciesRoutingModule {}
