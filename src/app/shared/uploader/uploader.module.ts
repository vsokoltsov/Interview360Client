import { NgModule } from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { UploaderComponent } from './uploader.component';
import { CommonModule } from '@angular/common';

import { LoaderModule } from '../loader/loader.module';

@NgModule({
  declarations: [
    UploaderComponent
  ],
  imports: [
    CommonModule,
    FileUploadModule,
    LoaderModule
  ],
  exports: [
    UploaderComponent, CommonModule, FileUploadModule, LoaderModule
  ]
})
export class UploaderModule {}
