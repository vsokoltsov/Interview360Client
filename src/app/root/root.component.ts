import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {
  subscription: Subscription;
  loading: boolean;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('loaders').subscribe(
      data => {
          setTimeout(() => {
            this.loading = data.isLoading;
          }, 1000);
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
