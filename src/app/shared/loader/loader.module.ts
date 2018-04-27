import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoaderComponent } from './loader.component';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [
    LoaderComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LoaderComponent,
    SpinnerComponent,
    CommonModule
  ]
})
export class LoaderModule{}
