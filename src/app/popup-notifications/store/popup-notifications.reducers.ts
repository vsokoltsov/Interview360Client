import { PopupNotification } from '../popup-notification.model';
import * as PopupNotificationsActions from './popup-notifications.actions';

export interface State {
  notifications: PopupNotification[]
};

export const initialState: State = {
  notifications: []
};

export function popupNotificationReducer(state = initialState,
  action: PopupNotificationsActions.PopupNotifications) {
    switch(action.type) {
      case PopupNotificationsActions.ADD_INFO_NOTIFICATION:
      case PopupNotificationsActions.ADD_ALERT_NOTIFICATION:
        return {
          ...state,
          notifications: [...state.notifications, action.payload]
        }
      case PopupNotificationsActions.DROP_NOTIFICATION:
        const deleteIndex = state.notifications.findIndex(item => item.id === action.payload.id);
        const oldNotifications = [...state.notifications];

        oldNotifications.splice(deleteIndex, 1);
        return {
          ...state,
          notifications: oldNotifications
        };
      default:
        return state;

    }
}
