import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { ApiService }  from '../api.service';

const URL = `${environment.baseUrl}/attachments/`;

@Component({
  selector: 'app-uploader-component',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss']
})
export class UploaderComponent implements OnInit, OnDestroy {
  @Input() contentType: string;
  uploader:FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'data',
    additionalParameter: { content_type: this.contentType },
    headers: [
      {name: 'Content-Type', value: 'multipart/form-data'}
    ]
  });
  hasBaseDropZoneOver:boolean = false;
  hasAnotherDropZoneOver:boolean = false;


  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.uploader.onAfterAddingFile = (fileItem)=> {
      fileItem.withCredentials = false;
      this.uploader.uploadAll();

      const file = fileItem.file;
      // fileItem.formData.push({ content_type: this.contentType });
      // fileItem.formData.push({ data: fileItem.file });
      // console.log(fileItem);
      let formData = new FormData();
      // formData.append('data', new Blob(file));
      // formData.append('content_type', this.contentType);
      // const params = { data: file, content_type: this.contentType };
      // this.apiService.postUpload(`/attachments/`, fileItem.formData).subscribe(
      //   data => {
      //     console.log(data);
      //   }
      // );
    };
  }

  ngOnDestroy() {

  }

  fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  fileOverAnother(e:any):void {
    this.hasAnotherDropZoneOver = e;
  }
}
