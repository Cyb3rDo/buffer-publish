import buffermetrics from '@bufferapp/buffermetrics/client';
import { actions as stripeActions } from '@bufferapp/stripe';
import { actionTypes as modalsActionTypes } from '@bufferapp/publish-modals';
import { actionTypes } from './reducer';

export default ({ getState, dispatch }) => next => (action) => { // eslint-disable-line
  const card = getState().upgradeModal.card;
  const source = getState().upgradeModal.source;

  /**
   * Pulling the User ID from the Bugsnag global feels wrong,
   * but this modal can be triggered immediately on load and
   * before the user data is loaded, so it's the safest.
   *
   * @todo: Have `server/index.js` put the user ID somewhere
   * more generic so we can pull the ID from there.
   */
  const userId = window._bugsnagConfig
    ? window._bugsnagConfig.user.id
    : '';

  next(action);

  switch (action.type) {
    case actionTypes.UPGRADE: {
      dispatch(stripeActions.validateCreditCard(card));
      buffermetrics.trackAction({
        application: 'PUBLISH',
        location: 'MODALS',
        action: 'submit_upgrade_to_pro',
        metadata: { userId, source },
      });
      break;
    }
    case modalsActionTypes.SHOW_UPGRADE_MODAL: {
      buffermetrics.trackAction({
        application: 'PUBLISH',
        location: 'MODALS',
        action: 'show_upgrade_to_pro',
        metadata: { userId, source: action.source },
      });
      break;
    }
    case modalsActionTypes.HIDE_UPGRADE_MODAL: {
      buffermetrics.trackAction({
        application: 'PUBLISH',
        location: 'MODALS',
        action: 'hide_upgrade_to_pro',
        metadata: { userId, source },
      });
      break;
    }
    default:
      break;
  }
};
