import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { DpDatePickerModule } from 'ng2-date-picker';
import { StoreModule, Store } from '@ngrx/store';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import 'rxjs/add/observable/of';

import { environment } from '../../../environments/environment';
import { MockActivatedRoute } from '../../shared/mock-activated-route';
import { Company } from '../company.model';
import { User } from '../../auth/user.model';
import { FormComponent } from './form.component';
import * as fromApp from '../../store/app.reducers';
import * as CompanyActions from '../store/companies.actions';
import { CompaniesService } from '../companies.service';
import { ApiService } from '../../shared/api.service';
import { CookieService } from 'angular2-cookie/core';
import { AuthService } from '../../auth/auth.service';
import { UploaderModule } from '../../shared/uploader/uploader.module';
import { LoaderModule } from '../../shared/loader/loader.module';
import { PopupNotificationsModule } from '../../popup-notifications/popup-notifications.module';
import { PopupNotificationsService } from '../../popup-notifications/popup-notifications.service';

const company = new Company(1, 'a', 'b', '2017-08-19', 'a');
const user = new User(1);
const response = {
  id: 1,
  name: 'aaa',
  description: 'awdawd',
  start_date: '2017-08-19',
  city: '1'
};
describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let store: Store<fromApp.AppState>;
  let httpMock: HttpTestingController;
  let activatedRouter: ActivatedRoute;
  let companiesService: CompaniesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormComponent
      ],
      imports: [
        ReactiveFormsModule,
        FileUploadModule,
        RouterTestingModule,
        StoreModule.forRoot(fromApp.reducers),
        HttpClientModule,
        HttpClientTestingModule,
        UploaderModule,
        LoaderModule,
        PopupNotificationsModule
      ],
      providers: [
        ApiService,
        AuthService,
        CompaniesService,
        CookieService,
        {
          provide: ActivatedRoute, useValue: {
            params: Observable.of({ id: company.id })
          }
        },
        PopupNotificationsService
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    activatedRouter = TestBed.get(ActivatedRoute);
    companiesService = TestBed.get(CompaniesService);
    spyOn(companiesService, 'receiveCompany').and.callThrough();
    fixture.detectChanges();
  }));

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call companiesService.receiveCompany', () => {
    activatedRouter.params = Observable.of({ id: company.id });
    fixture.detectChanges();

    store.dispatch(new CompanyActions.CompanyLoaded(company));
    expect(companiesService.receiveCompany).toHaveBeenCalled();
  });

  it('called formGroup.patchValue if detail is present', () => {
    spyOn(component.companyForm, 'patchValue').and.callThrough();
    store.dispatch(new CompanyActions.CompanyLoaded(company));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.companyForm.patchValue).toHaveBeenCalled();
    });
  });

  it('set component.updateFormErrors if errors are present', () => {
    const errors = { name: ['Can\'t be blank'] };
    store.dispatch(new CompanyActions.FailedUpdate(errors));
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.companyFormErrors).toEqual(errors);
    });
  });

  it('called component.companyForm.patchValue if id is abscent in params', () => {
    activatedRouter.params = Observable.of({ id: null });
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.companyForm.value.name).toBeNull();
    });
  });

  it('called companiesService.updateCompany if company present', () => {
    activatedRouter.params = Observable.of({ id: company.id });
    spyOn(companiesService, 'updateCompany').and.callThrough();
    component.currentCompany = company;
    component.owner = user;
    fixture.detectChanges();

    component.submit();
    expect(companiesService.updateCompany).toHaveBeenCalled();
  });

  it('called companiesServuce.createCompany if company is abscent', () => {
    activatedRouter.params = Observable.of({ id: null });
    spyOn(companiesService, 'createCompany').and.callThrough();
    component.owner = user;
    fixture.detectChanges();

    component.submit();
    expect(companiesService.createCompany).toHaveBeenCalled();
  });
});
