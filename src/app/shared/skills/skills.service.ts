import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { HttpErrorResponse, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { Skill } from './skill.model';
import { ApiService } from '../api.service';
import * as fromApp from '../../store/app.reducers';
import * as SkillsActions from './store/skills.actions';

@Injectable()
export class SkillsService {
  constructor(private apiService: ApiService,
              private store: Store<fromApp.AppState>) {}

  loadSkills() {
    this.apiService.get(`/skills/`).subscribe(
      response => {
        this.store.dispatch(new SkillsActions.SkillsLoaded(response.body));
      }
    );
  }
}