import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { PopupNotification } from './popup-notification.model';

import * as fromApp from '../store/app.reducers';

@Component({
  selector: '[app-popup-notifications]',
  templateUrl: './popup-notifications.component.html',
  styleUrls: ['./popup-notifications.component.scss']
})
export class PopupNotificationsComponent implements OnInit {
  subscription: Subscription;
  notifications: PopupNotification[];
  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('popupNotifications').subscribe(
      data => {
        if (data.notifications) {
          this.notifications = data.notifications;
        }
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
