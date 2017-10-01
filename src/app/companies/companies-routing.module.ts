import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompaniesComponent } from './companies.component';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { ItemComponent } from './list/item/item.component';
import { DetailComponent } from './detail/detail.component';

export const companiesRoutes: Routes = [
  { path: '', component: CompaniesComponent, children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: ListComponent },
    { path: ':id', component: DetailComponent },
    { path: 'new', component: FormComponent },
    { path: ':id/edit', component: FormComponent }
  ] }
];

@NgModule({
  imports: [
    RouterModule.forChild(companiesRoutes)
  ],
  exports: [RouterModule]
})
export class CompaniesRoutingModule {}
