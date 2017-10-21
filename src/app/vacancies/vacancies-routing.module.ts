import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VacanciesComponent } from './vacancies.component';
import { VacancyEmpty } from './vacancy-empty/vacancy-empty.component';

export const vacanciesRoutes: Routes = [
  { path: '', component: VacanciesComponent, children: [
    { path: '', component: VacancyEmpty },
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(vacanciesRoutes)
  ],
  exports: [RouterModule]
})
export class VacanciesRoutingModule {}
