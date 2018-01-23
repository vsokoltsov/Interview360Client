import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { IDatePickerConfig } from 'ng2-date-picker';

import { Resume } from '../../resume.model';
import { User } from '../../../auth/user.model';
import { Skill } from '../../../shared/skills/skill.model';
import { SkillsService } from '../../../shared/skills/skills.service';
import { ResumesService } from '../../resumes.service';
import { CompaniesService } from '../../../companies/companies.service';
import * as fromApp from '../../../store/app.reducers';
import * as ResumesActions from '../../store/resumes.actions';
import * as WorkplacesActions from '../../store/workplaces.actions';

@Component({
  selector: 'app-workplaces-form',
  templateUrl: './workplaces-form.component.html',
  styleUrls: ['./workplaces-form.component.scss']
})
export class WorkplacesFormComponent implements OnInit {
  workplacesForm: FormGroup;
  datePickerConfig: IDatePickerConfig = {
    format: 'YYYY-MM-DD',
    showSeconds: false,
    showTwentyFourHours: true
  };

  constructor(private store: Store<fromApp.AppState>,
              private location: Location) { }

  ngOnInit() {
    this.workplacesForm = new FormGroup({
      'workplaces': new FormArray([])
    });
  }

  addNewWorkplace() {
    const control = new FormGroup({
      'company': new FormControl(null, [Validators.required]),
      'position': new FormControl(null, [Validators.required]),
      'description': new FormControl(null, [Validators.required]),
      'start_date': new FormControl(null, [Validators.required]),
      'end_date': new FormControl(null, [Validators.required])
    });
    (<FormArray>this.workplacesForm.get('workplaces')).push(control);
  }

  getWorkplaces(form) {
    return form.get('workplaces').controls;
  }

  submit() {
    this.store.dispatch(new WorkplacesActions.AddWorkplace(this.workplacesForm.value.workplaces));
    this.location.back();
  }

  back() {
    this.location.back();
  }
}
