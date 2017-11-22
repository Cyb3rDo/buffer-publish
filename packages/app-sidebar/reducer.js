import {
  actionTypes as dataFetchActionTypes,
} from '@bufferapp/async-data-fetch';

export const actionTypes = {};

const initialState = {
  user: {
    loading: true,
    id: '0',
    name: '...',
    email: '...',
    avatar: '',
  },
  environment: 'production',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case `user_${dataFetchActionTypes.FETCH_START}`:
      return {
        ...state,
        user: {
          ...state.user,
          loading: true,
        },
      };
    case `user_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        user: {
          ...action.result,
          loading: false,
        },
      };
    case `environment_${dataFetchActionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        environment: action.result.environment,
      };
    default:
      return state;
  }
};

export const actions = {};
