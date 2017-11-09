import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
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
import { DpDatePickerModule } from 'ng2-date-picker';
import 'rxjs';
import 'rxjs/add/observable/of';

import { InterviewFormComponent } from './interview-form.component';
import { InterviewsComponent } from '../interviews.component';
import { InterviewListItemComponent } from '../interview-list-item/interview-list-item.component';
import { InterviewsService } from '../interviews.service';
import { VacanciesService } from '../../vacancies/vacancies.service';
import { EmployeesService } from '../../employees/employees.service';
import { User } from '../../auth/user.model';
import { Company } from '../../companies/company.model';
import { Interview } from '../interview.model';
import { Vacancy } from '../../vacancies/vacancy.model';
import { environment } from '../../../environments/environment';
import { ApiService } from '../../shared/api.service';
import * as fromApp from '../../store/app.reducers';
import * as InterviewsActions from '../store/interview.actions';
import * as VacanciesActions from '../../vacancies/store/vacancies.actions';
import * as EmployeesActions from '../../employees/store/employees.actions';
import { AutocompleteModule } from '../../shared/autocomplete/autocomplete.module';

const user = new User(1, 'wadawd', 'bbb');
const vacancy = new Vacancy(1, 'b', 'c');
const company = new Company(1, 'a', 'b', '2017-08-19', 'a');
const interview = new Interview(1, vacancy.id, company.id)
const detailResponse = {
  id: 1,
  company: {
    id: 1
  },
  vacancy: {
    id: 1
  }
};
const listResponse = [{
  id: 1,
  company_id: company.id,
  vacancy_id: vacancy.id
}];

describe('InterviewFormComponent', () => {
  let component: InterviewFormComponent;
  let fixture: ComponentFixture<InterviewFormComponent>;
  let store: Store<fromApp.AppState>;
  let interviewsService: InterviewsService;
  let employeesService: EmployeesService;
  let vacanciesService: VacanciesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InterviewFormComponent,
        InterviewsComponent,
        InterviewListItemComponent
      ],
      imports: [
        StoreModule.forRoot(fromApp.reducers),
        ReactiveFormsModule,
        RouterTestingModule,
        NgxSvgIconModule,
        HttpClientModule,
        HttpClientTestingModule,
        AutocompleteModule,
        DpDatePickerModule
      ],
      providers: [
        ApiService,
        CookieService,
        VacanciesService,
        EmployeesService,
        InterviewsService,
        {
          provide: ActivatedRoute, useValue: {
            params: Observable.of({ companyId: company.id, id: interview.id }),
            snapshot: {
              params: {
                id: interview.id
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
    fixture = TestBed.createComponent(InterviewFormComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    interviewsService = TestBed.get(InterviewsService);
    employeesService = TestBed.get(EmployeesService);
    vacanciesService = TestBed.get(VacanciesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('selectEmployee(): select employee for the interview', () => {
    component.selectEmployee(user);
    fixture.detectChanges();
    expect(component.interviewForm.get('candidate_email').value).toEqual(user.email);
  });

  it('selectEmployee(): disable popup showing for particular id', () => {
    component.currentPopupId = 'aaa';
    component.selectEmployee(user);
    fixture.detectChanges();
    expect(component.popupsShowing[component.currentPopupId]).toBeFalsy();
  });

  it('selectInterviewee(): adding item to the interviewee\'s list', () => {
    const control = new FormControl(null);
    (<FormArray>component.interviewForm.get('interviewee_ids')).push(control);

    fixture.detectChanges();
    component.selectInterviewee(0, user);
    expect((<FormArray>component.interviewForm.get('interviewee_ids'))
      .controls[0].value).toEqual(user.email);
  });

  it('selectInterviewee(): disable popup showing for particular id', () => {
    component.currentPopupId = 'aaa';
    const control = new FormControl(null);
    (<FormArray>component.interviewForm.get('interviewee_ids')).push(control);

    component.selectInterviewee(0, user);
    fixture.detectChanges();
    expect(component.popupsShowing[component.currentPopupId]).toBeFalsy();
  });

  it('selectVacancy(): set vacancy\'s id value', () => {
    component.selectVacancy(vacancy);
    fixture.detectChanges();
    expect(component.interviewForm.get('vacancy_id').value).toEqual(vacancy.id);
  });

  it('selectVacancy(): set vacancy\'s name', () => {
    component.selectVacancy(vacancy);
    fixture.detectChanges();
    expect(component.vacancyName).toEqual(vacancy.title);
  });

  it('selectVacancy(): disable popup showing for particular id', () => {
    component.currentPopupId = 'aaa';
    component.selectVacancy(vacancy);
    fixture.detectChanges();
    expect(component.popupsShowing[component.currentPopupId]).toBeFalsy();
  });

  it('getIntrviews(): receive interviews list', () => {
    const control = new FormControl(null);
    (<FormArray>component.interviewForm.get('interviewee_ids')).push(control);
    expect(component.getInterviews(component.interviewForm)).toEqual([control]);
  });

  it('addInterviewee(): push new control to interviewee list', () => {
    component.addInterviewee();
    expect((<FormArray>component.interviewForm.get('interviewee_ids')).length).toEqual(1);
  });

  it('submit(): submit form for interview creation', () => {
    spyOn(interviewsService, 'createInterview').and.callThrough();
    component.submit();
    expect(interviewsService.createInterview).toHaveBeenCalled();
  });

  it('employeeChange(): search user by value from event', () => {
    const event = {
      target: { value: 'AAAA' }
    };
    spyOn(employeesService, 'searchEmployees').and.callThrough();
    component.employeeChange(event);
    expect(employeesService.searchEmployees).toHaveBeenCalled();
  });

  it('employeeChange(): set popupId', () => {
    const popupId = 'aaa';
    const event = {
      target: { value: 'AAAA' }
    };
    component.employeeChange(event, popupId);
    expect(component.currentPopupId).toEqual(popupId);
  });

  it('vacanciesSearch(): search vacancy by value fron event', () => {
    const event = {
      target: { value: 'AAAA' }
    };
    spyOn(vacanciesService, 'searchVacancies').and.callThrough();
    component.vacanciesSearch(event);
    expect(vacanciesService.searchVacancies).toHaveBeenCalled();
  });

  it('vacanciesSearch(): set popupId', () => {
    const popupId = 'aaa';
    const event = {
      target: { value: 'AAAA' }
    };
    component.vacanciesSearch(event, popupId);
    expect(component.currentPopupId).toEqual(popupId);
  });

  it('deleteInterview(): delete already existing interview on form', () => {
    const control = new FormControl(null);
    (<FormArray>component.interviewForm.get('interviewee_ids')).push(control);
    fixture.detectChanges();
    component.deleteInterviewee(0);
    fixture.detectChanges();
    expect((<FormArray>component.interviewForm.get('interviewee_ids')).length).toEqual(0);
  });

  it('receives list of employees', () => {
    component.currentPopupId = 'aaa';
    store.dispatch(new EmployeesActions.EmployeesLoaded([user]));
    fixture.detectChanges();
    expect(component.employeesValues[component.currentPopupId]).toEqual([user]);
  });

  it('receives list of vacancies', () => {
    component.currentPopupId = 'aaa';
    store.dispatch(new VacanciesActions.VacanciesLoaded([vacancy]));
    fixture.detectChanges();
    expect(component.employeesValues[component.currentPopupId]).toEqual([vacancy]);
  });
});
