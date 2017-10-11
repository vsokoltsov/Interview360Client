import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompaniesComponent } from './companies.component';
import { FormComponent } from './form/form.component';
import { DetailComponent } from './detail/detail.component';
import { BaseComponent } from './base/base.component';

export const companiesRoutes: Routes = [
  { path: '', component: CompaniesComponent, children: [
    { path: '', component: BaseComponent },
    { path: 'new', component: FormComponent, pathMatch: 'full' },
    { path: ':id', component: DetailComponent },
    { path: ':id/edit', component: FormComponent }
  ] },
];

@NgModule({
  imports: [
    RouterModule.forChild(companiesRoutes)
  ],
  exports: [RouterModule]
})
export class CompaniesRoutingModule {}
