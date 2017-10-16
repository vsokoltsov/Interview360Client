import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { ApiService } from '../shared/api.service';
import { Vacancy } from './vacancy.model';

@Injectable()
export class VacanciesService {
  constructor(private apiService: ApiService) {}

  loadList(companyId: number) {
    this.apiService.get(`/companies/${companyId}/vacancies/`);
  }
}
