import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { Resume } from '../../resume.model';
import { User } from '../../../auth/user.model';
import { Skill } from '../../../shared/skills/skill.model';
import { SkillsService } from '../../../shared/skills/skills.service';
import { ResumesService } from '../../resumes.service';
import * as fromApp from '../../../store/app.reducers';
import * as ResumesActions from '../../store/resumes.actions';

@Component({
  selector: 'app-workplaces-form',
  templateUrl: './workplaces-form.component.html',
  styleUrls: ['./workplaces-form.component.scss']
})
export class WorkplacesFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
