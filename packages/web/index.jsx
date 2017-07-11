import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import {
  ConnectedRouter as Router,
} from 'react-router-redux';
import createStore, { history } from '@bufferapp/store';
import { actions as dataActions } from '@bufferapp/async-data-fetch';
import App from './components/App';


const store = createStore();

// TODO: remove thse after login service has been implemented
window.login = ({
  email,
  password,
  clientId,
  clientSecret,
}) => store.dispatch(dataActions.fetch({
  name: 'login',
  args: {
    email,
    password,
    clientId,
    clientSecret,
  },
}));

window.logout = () => store.dispatch(dataActions.fetch({
  name: 'logout',
  args: {
    token: store.getState().login.sessionToken,
  },
}));

const renderApp = (AppComponent) => {
  render(
    <AppContainer>
      <Provider store={store}>
        <Router history={history}>
          <AppComponent />
        </Router>
      </Provider>
    </AppContainer>,
    document.getElementById('root'),
  );
};

renderApp(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const newApp = require('./components/App').default; // eslint-disable-line global-require
    renderApp(newApp);
  });
}
