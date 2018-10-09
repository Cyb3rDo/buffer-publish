import { connect } from 'react-redux';
// import { actions as profileSidebarActions } from '../../profile-sidebar/index';
import { actions } from './reducer';
import GeneralSettings from "../general/components/GeneralSettings";

export default connect(
    state => ({
        loading: state.settings.loading,
        translations: state.i18n.translations.settings, // all package translations
        showClearAllModal: state.settings.showClearAllModal,
        profileName: state.settings.profileName,
        profileType: state.settings.profileType,
        profileService: state.settings.profileService,
        avatar: state.settings.avatar,
    })
)(GeneralSettings);

// export reducer, actions and action types
export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';