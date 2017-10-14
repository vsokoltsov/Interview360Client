import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Store, StoreModule } from '@ngrx/store';
import { CookieService } from 'angular2-cookie/core';

import { Company } from './company.model';
import { environment } from '../../environments/environment';
import { CompaniesService } from './companies.service';
import { ApiService } from '../shared/api.service';
import * as fromApp from '../store/app.reducers';
import * as ProfileActions from './store/companies.actions';

const company = new Company(1, 'a', 'b', '2017-08-19', 'a');
const response = {
  id: 1,
  name: 'a',
  description: 'c',
  start_date: '2017-08-19'
};

describe('CompaniesService', () => {
  let apiService: ApiService;
  let httpMock: HttpTestingController;
  let store: Store<fromApp.AppState>;
  let companiesService: CompaniesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(fromApp.reducers),
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        CompaniesService,
        ApiService,
        CookieService
      ]
    });

    store = TestBed.get(Store);
    companiesService = TestBed.get(CompaniesService);
    apiService = TestBed.get(ApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('loadList(): success response', () => {
    store.select('companies').subscribe(
      data => {
        if (data.list.length > 0) {
          expect(data.list[0].id).toEqual(response.id);
        }
    });

    companiesService.loadList();
    let result = httpMock.expectOne(`${environment.baseUrl}/companies/`);
    result.flush([response]);
    httpMock.verify();
  });
});
