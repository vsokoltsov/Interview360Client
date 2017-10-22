import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StoreModule, Store } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { NgxSvgIconModule } from 'ngx-svg-icon';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CookieService } from 'angular2-cookie/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs';
import 'rxjs/add/observable/of';

import { VacancyFormComponent } from './vacancy-form.component';
import { VacanciesComponent } from '../vacancies.component';
import { Company } from '../../companies/company.model';
import { VacanciesListItemComponent } from '../vacancies-list-item/vacancies-list-item.component';
import { environment } from '../../../environments/environment';
import { Vacancy } from '../vacancy.model';
import { Skill } from '../skill.model';
import { VacanciesService } from '../vacancies.service';
import { ApiService } from '../../shared/api.service';
import { AuthService } from '../../auth/auth.service';
import * as fromApp from '../../store/app.reducers';

const vacancy = new Vacancy(1, 'b', 'c');
const company = new Company(1, 'a', 'b', '2017-08-19', 'a');
const skill = new Skill(1, 'AA');
const detailResponse = {
  id: 1,
  name: 'aaa',
  description: 'awdawd',
  start_date: '2017-08-19',
  city: '1'
};
const skillsResponse = [{
  id: 1,
  name: 'AA'
}];
const listResponse = [{
  id: 1,
  name: 'aaa',
  description: 'awdawd',
  start_date: '2017-08-19',
  city: '1'
}];

describe('VacancyFormComponent', () => {
  let component: VacancyFormComponent;
  let fixture: ComponentFixture<VacancyFormComponent>;
  let httpMock: HttpTestingController;
  let store: Store<fromApp.AppState>;
  let vacanciesService: VacanciesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VacancyFormComponent,
        VacanciesComponent,
        VacanciesListItemComponent
      ],
      imports: [
        StoreModule.forRoot(fromApp.reducers),
        ReactiveFormsModule,
        RouterTestingModule,
        NgxSvgIconModule,
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        ApiService,
        AuthService,
        CookieService,
        VacanciesService,
        {
          provide: ActivatedRoute, useValue: {
            params: Observable.of({ companyId: company.id, id: vacancy.id }),
            snapshot: {
              params: {
                id: vacancy.id
              },
              parent: {
                params: {
                  companyId: company.id
                }
              }
            }
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacancyFormComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    vacanciesService = TestBed.get(VacanciesService);
    spyOn(vacanciesService, 'loadSkills').and.callThrough();
    httpMock = TestBed.get(HttpTestingController);
    fixture.detectChanges();

    let result = httpMock.expectOne(`${environment.baseUrl}/skills/`);
    result.flush(skillsResponse);
    let vacancyResult = httpMock.expectOne(
      `${environment.baseUrl}/companies/${company.id}/vacancies/${vacancy.id}/`
    );
    vacancyResult.flush(detailResponse);
    httpMock.verify();
    component.vacancyId = null;
    fixture.detectChanges();
  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('call loadSkills method', () => {
    expect(vacanciesService.loadSkills).toHaveBeenCalled();
  });

  it('load skills information', () => {
    fixture.whenStable().then(() => {
      expect(component.skills[0].id).toEqual(skill.id);
    });
  });

  it('add new item to vacancyForm', () => {
    component.addSkill(skill);
    expect(component.vacancyForm.value.skills).toEqual([skill]);
  });

  it('delete item from vacancyForm', () => {
    component.vacancyForm.patchValue({
      skills: [skill]
    });
    component.deleteSkill(skill);
    expect(component.vacancyForm.value.skills).toEqual([]);
  });

  it('call createVacancy', () => {
    spyOn(vacanciesService, 'createVacancy').and.callThrough();
    component.submit();
    expect(vacanciesService.createVacancy).toHaveBeenCalled();
  });

  it('call updateVacancy', () => {
    component.vacancyId = vacancy.id;
    spyOn(vacanciesService, 'updateVacancy').and.callThrough();
    fixture.detectChanges();
    component.submit();
    expect(vacanciesService.updateVacancy).toHaveBeenCalled();
  });
});
