import { async, ComponentFixture, TestBed } from '@angular/core/testing';


import {
  MdSidenavModule,
  MdToolbarModule,
  MdIconModule,
  MdListModule,
  MdCardModule
} from '@angular/material';
import { By } from '@angular/platform-browser';
import { StoreModule, Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { CookieService } from 'angular2-cookie/core';
import { DebugElement }    from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';

import { SideNavComponent } from './side-nav.component';
import { User } from '../auth/user.model';
import { reducers } from '../store/app.reducers';
import { AuthService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducers';
import * as AuthActions from '../auth/store/auth.actions';
import { ApiService } from '../shared/api.service';


const user = new User(1, 'example@mail.com', 'a', 'b');

describe('SideNavComponent', () => {
  let store: Store<fromApp.AppState>;
  let de: DebugElement;
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SideNavComponent
      ],
      imports: [
        MdSidenavModule,
        MdToolbarModule,
        MdIconModule,
        MdListModule,
        MdCardModule,
        StoreModule.forRoot(fromApp.reducers),
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        AuthService,
        ApiService,
        CookieService
      ]
    });

    fixture = TestBed.createComponent(SideNavComponent);
    store = TestBed.get(Store)
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('contains user email if it is present', () => {
    const action = new AuthActions.CurrentUserReceived(user);
    store.dispatch(action);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.user.email).toEqual(user.email);
    });
  });

  it('contains user email in template when it present', () => {
    const action = new AuthActions.CurrentUserReceived(user);
    store.dispatch(action);

    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const userEmail = de.query(By.css('.additional-info.info-block')).nativeElement;
      expect(userEmail.textContent).toContain(user.email);
    });
  });
});
