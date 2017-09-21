import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
  declarations: [
    ProfileComponent,
    EditComponent
  ],
  imports: [
    ReactiveFormsModule,
    ProfileRoutingModule,
    BrowserModule
  ]
})
export class ProfileModule {}
