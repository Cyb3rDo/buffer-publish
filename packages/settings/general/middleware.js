import {
  actions as dataFetchActions,
  actionTypes as dataFetchActionTypes,
} from '../../async-data-fetch/index';
import { actions as notificationActions } from '../../notifications/index';
import { actionTypes } from './reducer';

export default ({ dispatch, getState }) => next => (action) => {
  next(action);
  switch (action.type) {

  }
};
