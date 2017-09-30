import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RootComponent } from './root.component';
import { StoreModule, Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { CookieService } from 'angular2-cookie/core';
import { DebugElement }    from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import {
  MdSidenavModule,
  MdToolbarModule,
  MdIconModule,
  MdListModule,
  MdCardModule,
  MdInputModule,
  MdButtonModule
} from '@angular/material';

import { User } from '../auth/user.model';
import { reducers } from '../store/app.reducers';
import { AuthService } from '../auth/auth.service';
import * as fromApp from '../store/app.reducers';
import * as AuthActions from '../auth/store/auth.actions';
import { ApiService } from '../shared/api.service';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';
import { SideNavComponent } from '../side-nav/side-nav.component';

describe('RootComponent', () => {
  let component: RootComponent;
  let fixture: ComponentFixture<RootComponent>;
  let store: Store<fromApp.AppState>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RootComponent,
        HeaderComponent,
        SideNavComponent
      ],
      imports: [
        BrowserAnimationsModule,
        MdSidenavModule,
        MdToolbarModule,
        MdIconModule,
        MdListModule,
        MdCardModule,
        MdInputModule,
        MdButtonModule,
        RouterModule,
        RouterTestingModule,
        StoreModule.forRoot(fromApp.reducers),
        HttpClientModule
      ],
      providers: [
        AuthService,
        ApiService,
        CookieService
      ]
    });

    fixture = TestBed.createComponent(RootComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    de = fixture.debugElement;
    fixture.detectChanges();
  }));

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('toggle sidenav in toggleNavigation() method', () => {
    spyOn(component.sidenav, 'toggle').and.callThrough();

    component.toggleNavigation();
    expect(component.sidenav.toggle).toHaveBeenCalled();
  });
});
