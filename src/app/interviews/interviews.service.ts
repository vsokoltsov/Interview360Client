import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Interview } from './interview.model';
import { User } from '../auth/user.model';
import { ApiService } from '../shared/api.service';
import * as fromApp from '../store/app.reducers';
import * as InterviewsActions from './store/interview.actions';

@Injectable()
export class InterviewsService {
  constructor(private apiService: ApiService,
              private store: Store<fromApp.AppState>) {}

  loadList(companyId: number) {
    this.apiService.get(`/companies/${companyId}/interviews/`).subscribe(
      response => {
        this.store.dispatch(new InterviewsActions.InterviewsLoaded(response.body));
      }
    )
  }

  receiveInterview(companyId: number, id: number) {
    this.apiService.get(`/companies/${companyId}/interviews/${id}/`)
    .subscribe(
      response => {
        this.store.dispatch(new InterviewsActions.InterviewLoaded(response.body));
      }
    )
  }
}
