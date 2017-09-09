import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

import * as fromApp from '../store/app.reducers';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  routerLinks = [
    { label: 'Sign in', link: 'sign-in' },
    { label: 'Sign up', link: 'sign-up' }
  ];

  constructor(private store: Store<fromApp.AppState>, private router: Router) { }

  ngOnInit() {
    this.subscription = this.store.select('auth').subscribe(
      (data) => {
        if (data.currentUser) {
          this.router.navigate(['/companies']);
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
