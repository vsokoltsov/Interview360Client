import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CookieService } from 'angular2-cookie/core';
import { User } from '../auth/user.model';
import { ApiService, TOKEN_NAME } from '../shared/api.service';

import * as fromApp from '../store/app.reducers';
import * as ProfileActions from './store/profile.actions';

@Injectable()
export class ProfileService {
  constructor(private apiService: ApiService,
              private store: Store<fromApp.AppState>) {}

  receiveProfile(id: number) {
    this.apiService.get(`/users/${id}/`).subscribe(
      response => {
        this.store.dispatch(new ProfileActions.ReceiveProfile(response.body));
      }
    );
  }

  updateProfile(id:  number, params: {}) {
    this.apiService.put(`/users/${id}/`, params).subscribe(
      response => {
        this.store.dispatch(new ProfileActions.SuccessProfileUpdate(response.body.current_user));
      },
      (failure: HttpErrorResponse) => {
        this.store.dispatch(new ProfileActions.FailedProfileUpdate(failure.error.errors));
      }
    );
  }
}
