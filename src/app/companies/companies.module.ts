import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CompaniesRoutingModule } from './companies-routing.module';
import { CompaniesComponent } from './companies.component';
import { FormComponent } from './form/form.component';
import { ItemComponent } from './item/item.component';
import { DetailComponent } from './detail/detail.component';
import { BaseComponent } from './base/base.component';

@NgModule({
  declarations: [
    CompaniesComponent,
    FormComponent,
    ItemComponent,
    DetailComponent,
    BaseComponent
  ],
  imports: [
    CompaniesRoutingModule,
    CommonModule,
    ReactiveFormsModule,
  ]
})
export class CompaniesModule {}
