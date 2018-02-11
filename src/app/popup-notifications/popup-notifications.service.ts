import { Injectable } from '@angular/core';
import 'rxjs/Rx';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as PopupNotificationsActions from './store/popup-notifications.actions';

import { PopupNotification } from './popup-notification.model';
import { messages } from './popup-notifications.text';

let lastNotifId = 0;

@Injectable()
export class PopupNotificationsService {
  constructor(private store: Store<fromApp.AppState>) {}

  info(textId: string) {
    const content = messages[textId];
    const structure = {
      id: `id-${++lastNotifId}`,
      type: 'info',
      ...content
    };
    const notification = new PopupNotification(
      structure.id, structure.title, structure.type, structure.text
    );
    this.store.dispatch(new PopupNotificationsActions.AddInfoNotification(notification));
  }

  alert(textId: string) {
    const content = messages[textId];
    const structure = {
      id: `id-${++lastNotifId}`,
      type: 'danger',
      ...content
    };
    const notification = new PopupNotification(
      structure.id, structure.title, structure.type, structure.text
    );

    this.store.dispatch(new PopupNotificationsActions.AddAlertNotification(notification));
  }

  drop(textId: string) {
    this.store.dispatch(new PopupNotificationsActions.DropNotification({id: textId}));
  }
}
