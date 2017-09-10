import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs';
import { CookieService } from 'angular2-cookie/core';

import { environment } from '../../environments/environment';

export const TOKEN_NAME = 'imauthtoken';

@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient,
              private cookieService: CookieService) {}

  get(url: string) {
    return this.httpClient.get(
      `${environment.baseUrl}${url}`, { headers: this.getHeaders() }
    );
  }

  post(url: string, params: {}) {
    return this.httpClient.post(
      `${environment.baseUrl}${url}`, params,  { headers: this.getHeaders() }
    );
  }

  getHeaders(): HttpHeaders {
    const token = this.getToken();
    let headers = null;

    if (token) {
      headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    }
    return headers;
  }

  getToken() {
    return this.cookieService.get(TOKEN_NAME);
  }
}
