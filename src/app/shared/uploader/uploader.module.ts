import { NgModule } from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { UploaderComponent } from './uploader.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    UploaderComponent
  ],
  imports: [
    CommonModule,
    FileUploadModule
  ],
  exports: [
    UploaderComponent, CommonModule, FileUploadModule
  ]
})
export class UploaderModule {}
