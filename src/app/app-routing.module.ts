import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesComponent } from './companies/companies.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { AuthComponent } from './auth/auth.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { RootComponent } from './root/root.component';

const authRoutes = [
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent }
];

const appRoutes: Routes = [
  { path: 'auth', component: AuthComponent, children: authRoutes },
  { path: '', component: RootComponent, children: [
    { path: '', redirectTo: 'companies', pathMatch: 'full' },
    { path: 'companies', component: CompaniesComponent },
    { path: 'vacancies', component: VacanciesComponent }
  ]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
