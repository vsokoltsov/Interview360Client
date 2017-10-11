import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DetailComponent } from './detail.component';
import { StoreModule, Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { NgxSvgIconModule } from 'ngx-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import 'rxjs/add/observable/of';

import { MockActivatedRoute } from '../../shared/mock-activated-route';
import { Company } from '../company.model';
import { User } from '../../auth/user.model';
import { environment } from '../../../environments/environment';
import * as fromApp from '../../store/app.reducers';
import * as CompanyActions from '../store/companies.actions';

import { CompaniesService } from '../companies.service';
import { ApiService } from '../../shared/api.service';
import { CookieService } from 'angular2-cookie/core';
import { AuthService } from '../../auth/auth.service';
// import { UploaderModule } from '../shared/uploader/uploader.module';
//
// import { PipeModule } from '../shared/pipe.module';

const company = new Company(1, 'a', 'b', '2017-08-19', 'a');
const response = {
  id: 1,
  name: 'aaa',
  description: 'awdawd',
  start_date: '2017-08-19',
  city: '1'
};
describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let store: Store<fromApp.AppState>;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DetailComponent
      ],
      imports: [
        NgxSvgIconModule,
        RouterTestingModule,
        StoreModule.forRoot(fromApp.reducers),
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [
        CompaniesService,
        ApiService,
        AuthService,
        CookieService,
        {
          provide: MockActivatedRoute, useValue: {
            params: Observable.of({ id: company.id })
          }
        }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);

    fixture.detectChanges();
    store.dispatch(new CompanyActions.CompanyLoaded(company));
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
