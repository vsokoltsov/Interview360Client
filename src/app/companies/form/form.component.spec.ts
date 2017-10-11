import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { DpDatePickerModule } from 'ng2-date-picker';
import { StoreModule, Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

import { FormComponent } from './form.component';
import * as fromApp from '../../store/app.reducers';
import { CompaniesService } from '../companies.service';
import { ApiService } from '../../shared/api.service';
import { CookieService } from 'angular2-cookie/core';
import { UploaderComponent } from '../../shared/uploader/uploader.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormComponent,
        UploaderComponent
      ],
      imports: [
        ReactiveFormsModule,
        DpDatePickerModule,
        FileUploadModule,
        StoreModule.forRoot(fromApp.reducers),
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        ApiService,
        CompaniesService,
        CookieService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
