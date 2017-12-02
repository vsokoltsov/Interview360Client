import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
  HttpHeaders,
  HttpEventType
} from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CookieService } from 'angular2-cookie/core';
import { User } from './user.model';
import { ApiService, TOKEN_NAME } from '../shared/api.service';

import * as fromApp from '../store/app.reducers';
import * as AuthActions from './store/auth.actions';

@Injectable()
export class AuthService {

  constructor(private apiService: ApiService,
              private store: Store<fromApp.AppState>,
              private cookieService: CookieService) {}


  signIn(params: { email: string, password: string }) {
    this.apiService.post('/sign_in/', params)
      .subscribe(
        response => {
          this.cookieService.put(TOKEN_NAME, response.body.token);
          this.currentUser();
        },
        (failure: HttpErrorResponse) => {
          this.store.dispatch(new AuthActions.FailedSignIn(failure.error.errors));
        }
      )
  }

  signUp(params: {}) {
    this.apiService.post('/sign_up/', params)
      .subscribe(
        response => {
          this.cookieService.put(TOKEN_NAME, response.body.token);
          this.currentUser();
        },
        (failure: HttpErrorResponse) => {
          this.store.dispatch(new AuthActions.FailedSignUp(failure.error.errors));
        }
      )
  }

  restorePassword(params: {}) {
    this.apiService.post('/restore_password/', params)
      .subscribe(
        response => { },
        (failure: HttpErrorResponse) => {
          this.store.dispatch(new AuthActions.FailedRestorePassword(failure.error.errors));
        }
      )
  }

  resetPassword(params: {}) {
    this.apiService.post('/reset_password/', params)
      .subscribe(
        response => { },
        (failure: HttpErrorResponse) => {
          this.store.dispatch(new AuthActions.FailedResetPassword(failure.error.errors));
        }
      )
  }

  currentUser() {
    const token = this.cookieService.get(TOKEN_NAME);
    if (!token) return false;

    const authHeaders = new HttpHeaders().set('Authorization', `Token ${token}`);
    this.apiService.get('/current_user/').subscribe(
      response => {
        this.store.dispatch(new AuthActions.CurrentUserReceived(response.body.current_user));
      },
      (failure: HttpErrorResponse) => {
        console.log(failure);
      }
    )
  }

  inviteSubmit(companyId: number, params: {}) {
    this.apiService.post(`/companies/${companyId}/activate_member/`, params)
      .subscribe(
        response => {
          this.store.dispatch(new AuthActions.SuccessInviteSubmit());
        },
        (failure: HttpErrorResponse) => {
          this.store.dispatch(new AuthActions.FailedInviteSubmit(failure.error.errors));
        }
      )
  }

  signOut() {
    this.cookieService.remove(TOKEN_NAME);
    this.store.dispatch(new AuthActions.SignOut());
  }
}
