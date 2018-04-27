import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() attachmentUrl: string;
  @Input() imageSize: number;
  @Output() onSuccessUpload: EventEmitter<any> = new EventEmitter();
  uploader:FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'data'
  });
  hasBaseDropZoneOver:boolean = false;
  hasAnotherDropZoneOver:boolean = false;
  errorText: string;
  isLoading: boolean;


  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.uploader.onBuildItemForm = (item, form) => {
      form.append('content_type', this.contentType);
    };
    this.uploader.onAfterAddingFile = (fileItem)=> {
      this.isLoading = true;
      fileItem.withCredentials = false;
      this.uploader.uploadAll();
    };
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      if (status !== 400) {
        const attachment = JSON.parse(response).attachment;
        this.onSuccessUpload.emit({ attachment })
      }
      else {
        this.errorText = JSON.parse(response).errors.data;
      }
      this.isLoading = false;
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
