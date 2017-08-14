import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Redirect } from 'react-router';

import QueuedPosts from '@bufferapp/publish-queue';
import SentPosts from '@bufferapp/publish-sent';
import ProfileSettings from '@bufferapp/publish-settings';
import TabNavigation from '@bufferapp/publish-tabs';
import ProfileSidebar from '@bufferapp/publish-profile-sidebar';

import { actions as dataFetchActions } from '@bufferapp/async-data-fetch';

import { ScrollableContainer } from '@bufferapp/publish-shared-components';

const profilePageStyle = {
  display: 'flex',
  flexGrow: 1,
  height: '100%',
};

const profileSideBarStyle = {
  flexBasis: '16rem',
  width: '16rem',
  minWidth: '16rem',
};

const contentStyle = {
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  marginLeft: '1rem',
  marginRight: '1rem',
  height: '100vh',
};

const TabContent = ({ tabId, profileId }) => {
  switch (tabId) {
    case 'queue':
      return (
        <QueuedPosts
          profileId={profileId}
          onCancelConfirmClick={() => { }}
          onDeleteClick={() => { }}
          onDeleteConfirmClick={() => { }}
          onEditClick={() => { }}
          onShareNowClick={() => { }}
        />
      );
    case 'sent':
      return (
        <SentPosts
          profileId={profileId}
        />
      );
    case 'settings':
      return (
        <ProfileSettings />
      );
    default:
      return (
        <Redirect to="/" />
      );
  }
};

TabContent.propTypes = {
  tabId: PropTypes.string,
  profileId: PropTypes.string.isRequired,
};

TabContent.defaultProps = {
  tabId: '',
};

const handleLoadMore = ({
  profileId,
  page,
  tabId,
  loadingMore,
  moreToLoad,
  handleScroll,
}) => {
  const isPostsTab = ['queue', 'sent'].includes(tabId);
  if (!loadingMore && moreToLoad && isPostsTab) {
    handleScroll({ profileId, page, tabId });
  }
};

const ProfilePage = ({
  match: {
    params: {
      profileId,
      tabId,
    },
  },
  handleScroll,
  loadingMore,
  moreToLoad,
  page,
}) =>
  <div style={profilePageStyle}>
    <div style={profileSideBarStyle}>
      <ProfileSidebar
        profileId={profileId}
        tabId={tabId}
      />
    </div>
    <div style={contentStyle}>
      <TabNavigation
        profileId={profileId}
        tabId={tabId}
      />
      <ScrollableContainer
        tabId={tabId}
        onReachBottom={() => handleLoadMore({
          profileId,
          page,
          tabId,
          loadingMore,
          moreToLoad,
          handleScroll,
        })}
      >
        {TabContent({ tabId, profileId })}
      </ScrollableContainer>
    </div>
  </div>;

ProfilePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      tabId: PropTypes.string,
      profileId: PropTypes.string,
    }),
  }).isRequired,
  handleScroll: PropTypes.func.isRequired,
  loadingMore: PropTypes.bool.isRequired,
  moreToLoad: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
};

ProfilePage.defaultProps = {
  loading: false,
  loadingMore: false,
  moreToLoad: false,
  page: 1,
  posts: [],
  total: 0,
};

export default connect(
  (state, ownProps) => {
    const splitPath = ownProps.history.location.pathname.split('/');
    const tabId = splitPath.pop();
    return ({
      loading: state[tabId].loading,
      loadingMore: state[tabId].loadingMore,
      moreToLoad: state[tabId].moreToLoad,
      page: state[tabId].page,
      posts: state[tabId].posts,
      total: state[tabId].total,
      translations: state.i18n.translations.example, // all package translations
    });
  },
  dispatch => ({
    handleScroll: ({ profileId, page, tabId }) => {
      dispatch(
        dataFetchActions.fetch({
          name: `${tabId === 'queue' ? 'queued' : 'sent'}Posts`,
          args: {
            profileId,
            page,
            isFetchingMore: true,
          },
        }),
      );
    },
  }),
)(ProfilePage);
