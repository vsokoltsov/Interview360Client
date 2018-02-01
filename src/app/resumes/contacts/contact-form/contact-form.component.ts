import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { FormGroup, FormControl, FormArray,
  Validators, AbstractControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { IDatePickerConfig } from 'ng2-date-picker';

import { Resume } from '../../resume.model';
import { User } from '../../../auth/user.model';
import { Contact } from '../../contact.model';
import { ResumesService } from '../../resumes.service';
import * as fromApp from '../../../store/app.reducers';
import * as ResumesActions from '../../store/resumes.actions';
import * as ContactActions from '../../store/contact.actions';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  resumeSubscription: Subscription;
  contactSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>,
              private location: Location,
              private activatedRoute: ActivatedRoute,
              private resumesService: ResumesService) { }

  ngOnInit() {
  }

}
