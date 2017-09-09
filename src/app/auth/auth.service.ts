import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { CookieService } from 'angular2-cookie/core';

import * as fromApp from '../store/app.reducers';
import * as AuthActions from './store/auth.actions';

@Injectable()
export class AuthService {

  constructor(private httpClient: HttpClient,
              private store: Store<fromApp.AppState>,
              private cookieService: CookieService) {}


  signIn(params: { email: string, password: string }) {
    this.httpClient.post<{token: string}>('http://0.0.0.0:8080/api/v1/sign_in/', params)
      .subscribe(
        response => {
          this.cookieService.put('imauthtoken', response.token);
          console.log(response);
          console.log(this.cookieService.get('imauthtoken'));
        },
        error => {
          console.log(error.error.errors);
        }
      )
  }
}
