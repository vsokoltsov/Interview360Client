import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { EditComponent } from './edit/edit.component';
import { InfoComponent } from './edit/info/info.component';
import { PasswordComponent } from './edit/password/password.component';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { UploaderModule } from '../shared/uploader/uploader.module';

@NgModule({
  imports: [
    CommonModule,
    UploaderModule,
    ReactiveFormsModule,
    ProfileRoutingModule,
    FileUploadModule
  ],
  declarations: [
    ProfileComponent,
    EditComponent,
    InfoComponent,
    PasswordComponent
  ]
})
export class ProfileModule {}
