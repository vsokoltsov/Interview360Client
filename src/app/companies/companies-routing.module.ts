import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompaniesComponent } from './companies.component';
import { FormComponent } from './form/form.component';
import { ItemComponent } from './item/item.component';
import { DetailComponent } from './detail/detail.component';

export const companiesRoutes: Routes = [
  { path: '', component: CompaniesComponent },
  { path: ':id', component: DetailComponent },
  { path: ':id/edit', component: FormComponent },
  { path: 'new', component: FormComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(companiesRoutes)
  ],
  exports: [RouterModule]
})
export class CompaniesRoutingModule {}
