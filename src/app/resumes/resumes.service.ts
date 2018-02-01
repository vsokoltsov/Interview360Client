import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { User } from '../auth/user.model';
import { Resume } from './resume.model';
import { Workplace } from './workplace.model';
import { Contact } from './contact.model';
import { ApiService } from '../shared/api.service';
import { PopupNotificationsService } from '../popup-notifications/popup-notifications.service';
import * as fromApp from '../store/app.reducers';
import * as ResumesActions from './store/resumes.actions';
import * as WorkplacesActions from './store/workplaces.actions';
import * as LoaderActions from '../shared/loader/store/loaders.actions';
import * as ContactActions from './store/contact.actions';

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

  getResume(id: number) {
    this.store.dispatch(new LoaderActions.RequestStarted());
    this.apiService.get(`/resumes/${id}/`).subscribe(
      response => {
        this.store.dispatch(new LoaderActions.RequestFinished());
        this.store.dispatch(new ResumesActions.ReceiveResume(response.body));
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

  updateResume(id: number, params: {}) {
    this.store.dispatch(new LoaderActions.RequestStarted());
    this.apiService.put(`/resumes/${id}/`, params).subscribe(
      response => {
        this.store.dispatch(new LoaderActions.RequestFinished());
        this.store.dispatch(new ResumesActions.SuccessResumeUpdate(response.body.resume));
      },
      failed => {
        this.store.dispatch(new LoaderActions.RequestFinished());
        this.store.dispatch(new ResumesActions.FailedResumeUpdate(failed.error.errors));
      }
    );
  }

  addWorkplaces(workplaces: Workplace[]) {
    this.store.dispatch(new WorkplacesActions.AddWorkplace(workplaces));
  }

  addContact(contact: Contact) {
    this.store.dispatch(new ContactActions.AddContact(contact));
  }

  saveForm(form: {}) {
    this.store.dispatch(new ResumesActions.SaveForm(form));
  }
}
