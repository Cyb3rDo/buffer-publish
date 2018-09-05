import React from 'react';
import { connect } from 'react-redux';
import Composer from '@bufferapp/composer';

import '@bufferapp/composer/dist/composer-web-iframe-bundle.css';

console.log({Composer});

const ComposerWrapper = props => (
  <div>
    <Composer {...props} />
  </div>
);
ComposerWrapper.propTypes = Composer.propTypes;
ComposerWrapper.defaultProps = Composer.defaultProps;

export default connect(
  (state) => {
    if (state.appSidebar && state.profileSidebar) {
      const selectedProfileId = state.profileSidebar.selectedProfileId;
      const postId = state.queue.editingPostId;
      return ({
        userData: state.appSidebar.user,
        profiles: state.profileSidebar.profiles,
        enabledApplicationModes: state.enabledApplicationModes,
        environment: state.environment.environment,
        editMode: state.queue.editMode,
        post: state.queue.byProfileId[selectedProfileId].posts[postId],
      });
    }
    return {};
  },
  dispatch => ({
    onEvent: (type, data) => {
      dispatch({ type: 'COMPOSER_EVENT', eventType: type, data });
    },
  }),
)(ComposerWrapper);
