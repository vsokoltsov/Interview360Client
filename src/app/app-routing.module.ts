import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompaniesComponent } from './companies/companies.component';
import { VacanciesComponent } from './vacancies/vacancies.component';
import { AuthComponent } from './auth/auth.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { RestorePasswordComponent } from './auth/restore-password/restore-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { RootComponent } from './root/root.component';

export const authRoutes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'restore-password', component: RestorePasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent }
];

export const appRoutes: Routes = [
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
