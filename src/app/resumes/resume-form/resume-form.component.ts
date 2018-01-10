import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { Resume } from '../resume.model';
import { User } from '../../auth/user.model';

@Component({
  selector: 'app-resume-form',
  templateUrl: './resume-form.component.html',
  styleUrls: ['./resume-form.component.scss']
})
export class ResumeFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
