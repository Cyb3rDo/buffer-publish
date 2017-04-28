import store from 'store';
import { connect } from 'react-redux';
import LoginForm from './components';
import { actions } from './reducer';

export default connect(
  () => ({}),
  {
    onSubmit: actions.loginStart,
  },
)(LoginForm);

export { actions, actionTypes } from './reducer';
export middleware from './middleware';
export const getSession = () => store.get('session');
export const loggedIn = () => getSession() !== undefined;
