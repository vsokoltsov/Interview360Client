import { NgModule } from '@angular/core';
import { AutocompleteComponent } from './autocomplete.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AutocompleteComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AutocompleteComponent
  ]
})
export class AutocompleteModule {}
