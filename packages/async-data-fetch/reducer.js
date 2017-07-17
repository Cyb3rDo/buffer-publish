export const actionTypes = {
  FETCH: 'FETCH',
  FETCH_START: 'FETCH_START',
  FETCH_SUCCESS: 'FETCH_SUCCESS',
  FETCH_FAIL: 'FETCH_FAIL',
};

// TODO: grab the token from the cookie at init
const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case `login_${actionTypes.FETCH_SUCCESS}`:
      return {
        ...state,
        token: action.result.token,
      };
    case `logout_${actionTypes.FETCH_SUCCESS}`:
    case `logout_${actionTypes.FETCH_FAIL}`: {
      const { token, ...newState } = state;
      return newState;
    }
    default:
      return state;
  }
};

export const actions = {
  fetch: ({ name, args }) => ({
    type: actionTypes.FETCH,
    name,
    args,
  }),
  fetchStart: ({ name, args, id }) => ({
    type: `${name}_${actionTypes.FETCH_START}`,
    name,
    args,
    id,
  }),
  fetchSuccess: ({ name, args, id, result }) => ({
    type: `${name}_${actionTypes.FETCH_SUCCESS}`,
    name,
    args,
    id,
    result,
  }),
  fetchFail: ({ name, args, id, error }) => ({
    type: `${name}_${actionTypes.FETCH_FAIL}`,
    name,
    args,
    id,
    error,
  }),
};
