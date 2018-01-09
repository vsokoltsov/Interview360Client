import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { StoreModule, Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'angular2-cookie/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { MockActivatedRoute } from '../shared/mock-activated-route';
import { environment } from '../../environments/environment';
import { Company } from './company.model';
import { UploaderModule } from '../shared/uploader/uploader.module';
import { CompaniesComponent } from './companies.component';
import { CompanyListItemComponent } from './item/item.component';
import { DetailComponent } from './detail/detail.component';
import { BaseComponent } from './base/base.component';
import { NgxSvgIconModule } from 'ngx-svg-icon';
import { DpDatePickerModule } from 'ng2-date-picker';
import * as fromApp from '../store/app.reducers';
import * as CompanyActions from './store/companies.actions';
import { PipeModule } from '../shared/pipe.module';
import { CompaniesService } from './companies.service';
import { AuthService } from '../auth/auth.service';
import { ApiService } from '../shared/api.service';
import { LoaderModule } from '../shared/loader/loader.module';
import { PopupNotificationsModule } from '../popup-notifications/popup-notifications.module';
import { PopupNotificationsService } from '../popup-notifications/popup-notifications.service';

const company = new Company(1, 'a', 'b', '2017-08-19', 'a');
const response = { companies: [
  {
    id: 1,
    name: 'aaa',
    description: 'awdawd',
    start_date: '2017-08-19',
    city: '1'
  }
]};

describe('CompaniesComponent', () => {
  let component: CompaniesComponent;
  let fixture: ComponentFixture<CompaniesComponent>;
  let companiesService: CompaniesService;
  let store: Store<fromApp.AppState>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CompaniesComponent,
        CompanyListItemComponent
      ],
      imports: [
        NgxSvgIconModule,
        DpDatePickerModule,
        PipeModule,
        RouterTestingModule,
        HttpClientModule,
        HttpClientTestingModule,
        StoreModule.forRoot(fromApp.reducers),
        FileUploadModule,
        ReactiveFormsModule,
        UploaderModule,
        PopupNotificationsModule,
        LoaderModule
      ],
      providers: [
        CompaniesService,
        ApiService,
        CookieService,
        AuthService,
        PopupNotificationsService
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();


    fixture = TestBed.createComponent(CompaniesComponent);
    component = fixture.componentInstance;
    companiesService = TestBed.get(CompaniesService);
    spyOn(companiesService, 'loadList').and.callThrough();
    store = TestBed.get(Store);
    httpMock = TestBed.get(HttpTestingController);
    fixture.detectChanges();
    let result = httpMock.expectOne(`${environment.baseUrl}/companies/`);
    result.flush(response);
    httpMock.verify();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('call loadList on componentsService instance', () => {
    expect(companiesService.loadList).toHaveBeenCalled();
  });
});
