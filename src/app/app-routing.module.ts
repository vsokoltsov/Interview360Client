import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesComponent } from './companies/companies.component';
import { VacanciesComponent } from './vacancies/vacancies.component';

const appRoutes: Routes = [
  { path: '', component: CompaniesComponent },
  { path: 'companies', component: CompaniesComponent },
  { path: 'vacancies', component: VacanciesComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
