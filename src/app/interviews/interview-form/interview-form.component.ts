import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { IDatePickerConfig } from 'ng2-date-picker';
import { Interview } from '../interview.model';
import { User } from '../../auth/user.model';
import { Vacancy } from '../../vacancies/vacancy.model';
import { InterviewsService } from '../interviews.service';
import { VacanciesService } from '../../vacancies/vacancies.service';
import { EmployeesService } from '../../employees/employees.service';
import * as fromApp from '../../store/app.reducers';
import * as InterviewsActions from '../store/interview.actions';

@Component({
  selector: 'app-interview-form',
  templateUrl: './interview-form.component.html',
  styleUrls: ['./interview-form.component.scss']
})
export class InterviewFormComponent implements OnInit, OnDestroy{
  interviewForm: FormGroup;
  subscription: Subscription;
  vacanciesSubscription: Subscription;
  interviewsSubscrition: Subscription;
  companyId: number;
  interviewId: number;
  employees: User[] = [];
  vacancies: Vacancy[] = [];
  popupsShowing: {} = {};
  employeesValues: {} = {};
  datePickerConfig: IDatePickerConfig = {
    format: 'YYYY-MM-DD HH:m',
    showSeconds: false,
    showTwentyFourHours: true
  };
  vacancyName: string = '';
  interview: Interview;
  @Input() showPopup = false;
  public currentPopupId: string;
  public assigned_at: any;
  public interviewFormErrors: Object = { };

  constructor(private store: Store<fromApp.AppState>,
              private interviewsService: InterviewsService,
              private vacanciesService: VacanciesService,
              private employeesService: EmployeesService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.interviewForm = new FormGroup({
      'candidate_email': new FormControl({value: null, disabled: this.interview !== null }, [Validators.required]),
      'vacancy_id': new FormControl({value: null, disabled: this.interview !== null }, [Validators.required]),
      'assigned_at': new FormControl(null, [Validators.required]),
      'interviewee_ids': new FormArray([])
    });
    this.activatedRoute.params.subscribe((params: Params) => {
      const parameters = this.activatedRoute.snapshot;
      const parentParams = parameters.parent.params;
      this.companyId = parentParams['companyId'];
      this.interviewId = parameters.params['id'];
      if (this.interviewId) {
        this.interviewsService.receiveInterview(this.companyId, this.interviewId);
      }
      else {
        if (this.interviewForm) {
          this.interviewForm.patchValue({
            candidate_email: null,
            vacancy_id: null,
            assigned_at: null,
            interviewee_ids: []
          });
        }
      }
    });
    this.subscription = this.store.select('employees').subscribe(
      data => {
        if (data.list) {
          if (data.list.length > 0) { this.popupsShowing[this.currentPopupId] = true; }
          this.employeesValues[this.currentPopupId] = data.list;
        }
      }
    );
    this.vacanciesSubscription = this.store.select('vacancies').subscribe(
      data => {
        if (data.list) {
          if (data.list.length > 0) { this.popupsShowing[this.currentPopupId] = true; }
          this.employeesValues[this.currentPopupId] = data.list;
        }
      }
    );
    this.interviewsSubscrition = this.store.select('interviews').subscribe(
      data => {
        if (data.detail) {
          let intervieweesIds = [];
          this.interview = data.detail;
          this.vacancyName = this.interview.vacancy.title;
          if (this.interview.interviewees) {
            intervieweesIds = this.interview.interviewees.map(item => {
                return new FormControl({value: item.email, disabled: this.interview !== null }, Validators.required);
            });
          }
          this.interviewForm.patchValue({
            'candidate_email': data.detail.candidate.email,
            'vacancy_id':  data.detail.vacancy.id,
            'assigned_at': data.detail.assigned_at
          });
          if ((<FormArray>this.interviewForm.get('interviewee_ids')).controls.length == 0) {
            this.interviewForm.setControl('interviewee_ids', new FormArray(intervieweesIds));
          }
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.vacanciesSubscription.unsubscribe();
    this.interviewsSubscrition.unsubscribe();
  }

  selectEmployee(employee: User) {
    this.interviewForm.get('candidate_email').setValue(employee.email);
    this.popupsShowing[this.currentPopupId] = false;
  }

  selectInterviewee(index: number, employee: User) {
    (<FormArray>this.interviewForm.get('interviewee_ids'))
      .controls[index].setValue(employee.email);
    this.popupsShowing[this.currentPopupId] = false;
  }

  selectVacancy(vacancy: Vacancy) {
    this.interviewForm.get('vacancy_id').setValue(vacancy.id);
    this.vacancyName = vacancy.title;
    this.popupsShowing[this.currentPopupId] = false;
  }

  getInterviews(form) {
    return form.get('interviewee_ids').controls;
  }

  addInterviewee() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.interviewForm.get('interviewee_ids')).push(control);
  }

  submit() {
    if (this.interview) {
      this.interviewsService.updateInterview(this.companyId, this.interview.id, this.interviewForm.value);
    } else {
        this.interviewsService.createInterview(this.companyId, this.interviewForm.value);
    }
  }

  employeeChange(event: any, popupId?: string) {
    if (popupId) {
      this.currentPopupId = popupId;
    }
    this.employeesService.searchEmployees(this.companyId, event.target.value);
  }

  vacanciesSearch(event: any, popupId?: string) {
    if (popupId) {
      this.currentPopupId = popupId;
    }
    this.vacanciesService.searchVacancies(this.companyId, event.target.value);
  }

  deleteInterviewee(index: number) {
    (<FormArray>this.interviewForm.get('interviewee_ids')).removeAt(index);
  }

  focusOut() {

  }
}
