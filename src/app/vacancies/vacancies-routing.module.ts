import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VacanciesComponent } from './vacancies.component';
import { VacancyEmpty } from './vacancy-empty/vacancy-empty.component';
import { VacancyDetailComponent } from './vacancy-detail/vacancy-detail.component';
import { VacancyFormComponent } from './vacancy-form/vacancy-form.component';

export const vacanciesRoutes: Routes = [
  { path: '', component: VacanciesComponent, children: [
    { path: '', component: VacancyEmpty },
    { path: 'new', component: VacancyFormComponent, pathMatch: 'full' },
    { path: ':id', component: VacancyDetailComponent },
    { path: ':id/edit', component: VacancyFormComponent }
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(vacanciesRoutes)
  ],
  exports: [RouterModule]
})
export class VacanciesRoutingModule {}
