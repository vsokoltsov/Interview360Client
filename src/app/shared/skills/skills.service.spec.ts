import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Store, StoreModule } from '@ngrx/store';
import { CookieService } from 'angular2-cookie/core';

import { Skill } from './skill.model';
import { environment } from '../../../environments/environment';
import { SkillsService } from './skills.service';
import { ApiService } from '../api.service';
import * as fromApp from '../../store/app.reducers';
import { PopupNotificationsService } from '../../popup-notifications/popup-notifications.service';

const skill = new Skill(1);

const response = {
  id: 1,
  name: 'aaa'
};

fdescribe('SkillsService', () => {
  let apiService: ApiService;
  let httpMock: HttpTestingController;
  let store: Store<fromApp.AppState>;
  let skillsService: SkillsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(fromApp.reducers),
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        SkillsService,
        ApiService,
        CookieService,
        PopupNotificationsService
      ]
    });

    store = TestBed.get(Store);
    skillsService = TestBed.get(SkillsService);
    apiService = TestBed.get(ApiService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('loadSkills()', () => {
    store.select('skills').subscribe(
      data => {
        if (data.list.length > 0) {
          expect(data.list[0].id).toEqual(response.id);
        }
    });

    skillsService.loadSkills();
    let result = httpMock.expectOne(`${environment.baseUrl}/skills/`);
    result.flush([response]);
    httpMock.verify();
  });

  it('searchSkills()', () => {
    store.select('skills').subscribe(
      data => {
        if (data.list.length > 0) {
          expect(data.list[0].id).toEqual(response.id);
        }
    });

    skillsService.searchSkills('1');
    let result = httpMock.expectOne(`${environment.baseUrl}/skills/search/?q=1`);
    result.flush({skills: [response]});
    httpMock.verify();
  });

  it('removeSkills()', () => {
    store.select('skills').subscribe(
      data => {
        expect(data.list.length).toEqual(0);
    });
    skillsService.removeSkills();
  });
});
