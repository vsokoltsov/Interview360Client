import { Action } from '@ngrx/store';
import { PopupNotification } from '../popup-notification.model';

export const ADD_INFO_NOTIFICATION = 'ADD_INFO_NOTIFICATION';
export const ADD_ALERT_NOTIFICATION = 'ADD_ALERT_NOTIFICATION';
export const DROP_NOTIFICATION = 'DROP_NOTIFICATION';

export class AddInfoNotification implements Action {
  readonly type = ADD_INFO_NOTIFICATION;

  constructor(public payload: PopupNotification) {}
}

export class AddAlertNotification implements Action {
  readonly type = ADD_ALERT_NOTIFICATION;

  constructor(public payload: PopupNotification) {}
}

export class DropNotification implements Action {
  readonly type = DROP_NOTIFICATION;

  constructor(public payload: { id: string }) {}
}

export type PopupNotifications = AddInfoNotification |
AddAlertNotification |
DropNotification;
