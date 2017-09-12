import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpHeaders, HttpEventType } from '@angular/common/http';
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
          this.cookieService.put(TOKEN_NAME, response.token);
          this.currentUser();
        },
        (failure: HttpErrorResponse) => {
          this.store.dispatch(new AuthActions.FailedSignIn(failure.error.errors));
        }
      )
  }

  currentUser() {
    const token = this.cookieService.get(TOKEN_NAME);
    if (!token) return false;

    const authHeaders = new HttpHeaders().set('Authorization', `Token ${token}`);
    this.apiService.get('/current_user/').subscribe(
      (response: {current_user: User}) => {
        this.store.dispatch(new AuthActions.SuccessSignIn(response.current_user));
      },
      (failure: HttpErrorResponse) => {
        console.log(failure);
      }
    )
  }
}
