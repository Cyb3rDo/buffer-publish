import { actionTypes as dataFetchActionTypes } from '@bufferapp/async-data-fetch';
import { actionTypes as initialLoadingActionTypes } from '@bufferapp/publish-initial-loading';
import { actions as notificationActions } from '@bufferapp/notifications';

import getNotificationMessage from './utils/getNotificationMessage';

export default ({ dispatch, getState }) => next => (action) => {
  next(action);
  switch (action.type) {
    case `profiles_${dataFetchActionTypes.FETCH_SUCCESS}`:
    case initialLoadingActionTypes.PROFILE_LOADING_REDIRECT: {
      const profilesLoaded = getState().profileSidebar.loading === false;
      if (!profilesLoaded) {
        break;
      }

      if (window._notification) {
        const notificationType = window._notification.type;

        const message = getNotificationMessage(
          notificationType,
          window._notification.key,
          window._notification.variable,
        );

        if (message) {
          dispatch(notificationActions.createNotification({
            notificationType,
            message,
          }));
        }
      }
      break;
    }
    default:
      break;
  }
};
