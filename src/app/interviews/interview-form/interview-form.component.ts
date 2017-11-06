import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { IDatePickerConfig } from 'ng2-date-picker';
import { Interview } from '../interview.model';
import { User } from '../../auth/user.model';
import { InterviewsService } from '../interviews.service';
import { EmployeesService } from '../../employees/employees.service';
import * as fromApp from '../../store/app.reducers';
import * as InterviewsActions from '../store/interview.actions';

@Component({
  selector: 'app-interview-form',
  templateUrl: './interview-form.component.html',
  styleUrls: ['./interview-form.component.scss']
})
export class InterviewFormComponent implements OnInit {
  interviewForm: FormGroup;
  subscription: Subscription;
  companyId: number;
  interviewId: number;
  employees: User[] = [];
  datePickerConfig: IDatePickerConfig = {
    format: 'YYYY-MM-DD HH:m',
    showSeconds: false,
    showTwentyFourHours: true
  };
  @Input() showPopup = false;
  public assigned_at: any;
  public interviewFormErrors: Object = { };

  constructor(private store: Store<fromApp.AppState>,
              private interviewsService: InterviewsService,
              private employeesService: EmployeesService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.interviewForm = new FormGroup({
      'candidate_email': new FormControl(null, [Validators.required]),
      'vacancy_id': new FormControl(null, [Validators.required]),
      'assigned_at': new FormControl(null, [Validators.required]),
      'interviewee_ids': new FormArray([])
    });
    this.activatedRoute.params.subscribe((params: Params) => {
      const parameters = this.activatedRoute.snapshot;
      const parentParans = parameters.parent.params;
      this.companyId = parentParans['companyId'];

    });
    this.subscription = this.store.select('employees').subscribe(
      data => {
        if (data.list) {
          if (data.list.length > 0) { this.showPopup = true; }
          this.employees = data.list;
        }
      }
    );
  }


  selectEmployee(employee: User) {
    this.interviewForm.get('candidate_email').setValue(employee.email);
    this.showPopup = false;
  }

  getInterviews(form) {
    return form.get('interviewee_ids').controls;
  }

  addInterviewee() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.interviewForm.get('interviewee_ids')).push(control);
  }

  submit() {
    this.interviewsService.createInterview(this.companyId, this.interviewForm.value);
  }

  employeeChange(event: any) {
    this.employeesService.searchEmployees(this.companyId, event.target.value);
  }
}
