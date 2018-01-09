import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducers';

@Component({
  selector: 'app-popup-notifications',
  templateUrl: './popup-notifications.component.html',
  styleUrls: ['./popup-notifications.component.scss']
})
export class PopupNotificationsComponent implements OnInit {
  subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('loaders').subscribe(
      data => {
        // this.loading = data.isLoading;
        // this.cdr.detectChanges();
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
