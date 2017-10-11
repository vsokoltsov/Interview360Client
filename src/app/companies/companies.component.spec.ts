import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { StoreModule, Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'angular2-cookie/core';

import { UploaderModule } from '../shared/uploader/uploader.module';
import { CompaniesComponent } from './companies.component';
import { CompaniesRoutingModule } from './companies-routing.module';
import { FormComponent } from './form/form.component';
import { CompanyListItemComponent } from './item/item.component';
import { DetailComponent } from './detail/detail.component';
import { BaseComponent } from './base/base.component';
import { NgxSvgIconModule } from 'ngx-svg-icon';
import { DpDatePickerModule } from 'ng2-date-picker';
import * as fromApp from '../store/app.reducers';
import { PipeModule } from '../shared/pipe.module';
import { CompaniesService } from './companies.service';
import { ApiService } from '../shared/api.service';


describe('CompaniesComponent', () => {
  let component: CompaniesComponent;
  let fixture: ComponentFixture<CompaniesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CompaniesComponent,
        FormComponent,
        CompanyListItemComponent,
        DetailComponent,
        BaseComponent
      ],
      imports: [
        NgxSvgIconModule,
        DpDatePickerModule,
        PipeModule,
        RouterTestingModule,
        HttpClientModule,
        StoreModule.forRoot(fromApp.reducers),
        FileUploadModule,
        ReactiveFormsModule,
        UploaderModule
      ],
      providers: [
        CompaniesService,
        ApiService,
        CookieService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
