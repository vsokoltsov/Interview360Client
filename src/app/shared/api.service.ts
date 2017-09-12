import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpRequest, HttpHeaders } from '@angular/common/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';
import { CookieService } from 'angular2-cookie/core';

import { environment } from '../../environments/environment';

export const TOKEN_NAME = 'imauthtoken';

@Injectable()
export class ApiService {
  constructor(private httpClient: HttpClient,
              private cookieService: CookieService) {}

  get(url: string) {
    return this.request('GET', url);
  }

  post(url: string, params: {}) {
    return this.request('POST', url, params);
  }

  getHeaders(): HttpHeaders {
    const token = this.getToken();
    let headers = null;

    if (token) {
      headers = new HttpHeaders().set('Authorization', `Token ${token}`);
    }
    return headers;
  }

  request(method: string, url: string, params = null) {
    const request = new HttpRequest(method, `${environment.baseUrl}${url}`, {
      headers: this.getHeaders(),
      params: params
    });
    return this.httpClient.request(request).catch(
      error => {
        if (error.status === 401) {
          console.log(error.status);
          this.cookieService.remove(TOKEN_NAME);
        }
        return Observable.throw(error);
      }
    );
  }

  getToken() {
    return this.cookieService.get(TOKEN_NAME);
  }
}
