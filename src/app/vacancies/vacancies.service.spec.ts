import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Store, StoreModule } from '@ngrx/store';
import { CookieService } from 'angular2-cookie/core';

import { ApiService } from '../shared/api.service';
import { VacanciesService } from './vacancies.service';
import { Vacancy } from './vacancy.model';
import { Company } from '../companies/company.model';
import { environment } from '../../environments/environment';

const response = {
  id: 1,
  title: 'a',
  description: 'c',
  salary: 120000
};
const vacancy = new Vacancy(1, 'b', 'c');
const company = new Company(1, 'a', 'b', '2017-08-19', 'a');

describe('VacanciesService', () => {
  let apiService: ApiService;
  let httpMock: HttpTestingController;
  let vacanciesService: VacanciesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        VacanciesService,
        ApiService,
        CookieService
      ]
    });

    vacanciesService = TestBed.get(VacanciesService);
    apiService = TestBed.get(ApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('call get() method on apiService', () => {
    spyOn(apiService, 'get').and.callThrough();

    vacanciesService.loadList(company.id);

    expect(apiService.get).toHaveBeenCalled();
  });
});
