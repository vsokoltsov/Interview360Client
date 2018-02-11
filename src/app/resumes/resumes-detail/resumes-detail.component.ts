import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';
import {Router, ActivatedRoute, Params} from '@angular/router';

import { Resume } from '../resume.model';
import { User } from '../../auth/user.model';
import { Contact } from '../contact.model';
import { Workplace } from '../workplace.model';
import { ResumesService } from '../resumes.service';
import * as fromApp from '../../store/app.reducers';
import * as ResumesActions from '../store/resumes.actions';

@Component({
  selector: 'app-resumes-detail',
  templateUrl: './resumes-detail.component.html',
  styleUrls: ['./resumes-detail.component.scss']
})
export class ResumesDetailComponent implements OnInit, OnDestroy {
  resumeSubscription: Subscription;
  resume: Resume;
  contact: Contact;
  workplaces: Workplace[];

  constructor(private store: Store<fromApp.AppState>,
              private resumesService: ResumesService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      const resumeId = params['id'];
      this.resumesService.getResume(resumeId);
    });
    this.resumeSubscription = this.store.select('resumes').subscribe(
      data => {
        if (data.detail) {
          this.resume = data.detail;
          this.contact = data.detail.contact;
          this.workplaces = data.detail.workplaces;
          console.log(this.resume);
        }
      }
    );
  }

  ngOnDestroy() {
    this.resumeSubscription.unsubscribe();
  }

}
