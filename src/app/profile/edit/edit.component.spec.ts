import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditComponent } from './edit.component';
import { By } from '@angular/platform-browser';
import { StoreModule, Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { CookieService } from 'angular2-cookie/core';
import { DebugElement }    from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { User } from '../../auth/user.model';
import { reducers } from '../../store/app.reducers';
import { AuthService } from '../../auth/auth.service';
import * as fromApp from '../../store/app.reducers';
import * as AuthActions from '../../auth/store/auth.actions';
import * as ProfileActions from '../store/profile.actions';
import { ApiService } from '../../shared/api.service';
import { ProfileService } from '../profile.service';

const user = new User(1, 'example@mail.com', 'a', 'b');

describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;
  let store: Store<fromApp.AppState>;
  let profileService: ProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        EditComponent,
      ],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(fromApp.reducers),
        HttpClientModule,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        AuthService,
        ProfileService,
        ApiService,
        CookieService
      ]
    });

    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    profileService = TestBed.get(ProfileService);
    spyOn(profileService, 'receiveProfile').and.callThrough();
    // store.dispatch(new ProfileActions.ReceiveProfile(user));
    fixture.detectChanges();

    const action = new AuthActions.CurrentUserReceived(user);
    store.dispatch(action);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call profileService.receiveProfile', () => {
    expect(profileService.receiveProfile).toHaveBeenCalled();
  });
});
