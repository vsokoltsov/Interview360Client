import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { User } from '../auth/user.model';
import { Resume } from './resume.model';
import { ApiService } from '../shared/api.service';
import { PopupNotificationsService } from '../popup-notifications/popup-notifications.service';
import * as fromApp from '../store/app.reducers';
import * as ResumesActions from './store/resumes.actions';
import * as LoaderActions from '../shared/loader/store/loaders.actions';

@Injectable()
export class ResumesService {
  constructor(private apiService: ApiService,
              private store: Store<fromApp.AppState>,
              private popupNotificationsService: PopupNotificationsService) {}

  loadResumes() {
    this.store.dispatch(new LoaderActions.RequestStarted());
    this.apiService.get('/resumes/').subscribe(
      response => {
        this.store.dispatch(new LoaderActions.RequestFinished());
        this.store.dispatch(new ResumesActions.ResumesList(response.body));
      }
    );
  }

  searchResumes(query: string) {
    const params = new HttpParams().set('q', query);
    this.store.dispatch(new LoaderActions.RequestStarted());
    this.apiService.get(`/resumes/search/`, params).subscribe(
      response => {
        this.store.dispatch(new LoaderActions.RequestFinished());
        this.store.dispatch(new ResumesActions.ResumesList(response.body.resumes));
      }
    );
  }

  createResume(params: {}) {
    this.store.dispatch(new LoaderActions.RequestStarted());
    this.apiService.post('/resumes/', params).subscribe(
      response => {
        this.popupNotificationsService.info('successResumeCreated');
        this.store.dispatch(new LoaderActions.RequestFinished());
        this.store.dispatch(new ResumesActions.SuccessResumeCreated(response.body));
      },
      failed => {
        this.popupNotificationsService.alert('failedResumeCreated');
        this.store.dispatch(new LoaderActions.RequestFinished());
        this.store.dispatch(new ResumesActions.FailedResumeCreated(failed.error.errors));
      }
    );
  }
}
