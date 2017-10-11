import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { DpDatePickerModule } from 'ng2-date-picker';
import { StoreModule, Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import 'rxjs/add/observable/of';

import { environment } from '../../../environments/environment';
import { MockActivatedRoute } from '../../shared/mock-activated-route';
import { Company } from '../company.model';
import { FormComponent } from './form.component';
import * as fromApp from '../../store/app.reducers';
import * as CompanyActions from '../store/companies.actions';
import { CompaniesService } from '../companies.service';
import { ApiService } from '../../shared/api.service';
import { CookieService } from 'angular2-cookie/core';
import { AuthService } from '../../auth/auth.service';
import { UploaderModule } from '../../shared/uploader/uploader.module';

const company = new Company(1, 'a', 'b', '2017-08-19', 'a');
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        FormComponent
      ],
      imports: [
        ReactiveFormsModule,
        DpDatePickerModule,
        FileUploadModule,
        StoreModule.forRoot(fromApp.reducers),
        RouterTestingModule,
        HttpClientModule,
        HttpClientTestingModule,
        UploaderModule
      ],
      providers: [
        ApiService,
        AuthService,
        CompaniesService,
        CookieService,
        {
          provide: MockActivatedRoute, useValue: {
            params: Observable.of({ id: company.id })
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    fixture.detectChanges();

    store.dispatch(new CompanyActions.CompanyLoaded(company));
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
