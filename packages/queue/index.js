import { connect } from 'react-redux';

import { actions as profileSidebarActions } from '@bufferapp/publish-profile-sidebar';
import { actions as generalSettingsActions } from '@bufferapp/publish-general-settings';
import { actions } from './reducer';

import QueuedPosts from './components/QueuedPosts';

const formatPostLists = (isManager, posts) => {
  const orderedPosts = Object.values(posts).sort((a, b) => a.due_at - b.due_at);
  let lastHeader = null;
  return orderedPosts.reduce((acc, post, index) => {
    if (lastHeader !== post.day) {
      lastHeader = post.day;
      acc.push({
        queueItemType: 'header',
        text: post.day,
        id: `header-${index}`,
        isManager,
      });
    }
    acc.push({
      queueItemType: 'post',
      isManager,
      index,
      ...post,
    });
    return acc;
  }, []);
};

export default connect(
  (state, ownProps) => {
    const profileId = ownProps.profileId;
    const profileQueuePosts = state.queue.byProfileId[profileId];
    const profileData = state.profileSidebar.profiles.find(p => p.id === ownProps.profileId);
    if (profileQueuePosts && profileData) {
      return {
        loading: profileQueuePosts.loading,
        loadingMore: profileQueuePosts.loadingMore,
        moreToLoad: profileQueuePosts.moreToLoad,
        page: profileQueuePosts.page,
        postLists: formatPostLists(
          profileData.isManager,
          profileQueuePosts.posts,
        ),
        total: profileQueuePosts.total,
        enabledApplicationModes: state.queue.enabledApplicationModes,
        showComposer: state.queue.showComposer,
        environment: state.environment.environment,
        editMode: state.queue.editMode,
        editingPostId: state.queue.editingPostId,
        showCalendar: profileQueuePosts.showCalendar,
        numberOfPostsByDate: profileQueuePosts.numberOfPostsByDate,
        subprofiles: profileData.subprofiles || [],
        isInstagramProfile: profileData.type === 'instagram',
        isInstagramBusiness: profileData.isInstagramBusiness,
        paused: profileData.paused,
      };
    }
    return {};
  },
  (dispatch, ownProps) => ({
    onEditClick: (post) => {
      dispatch(actions.handleEditClick({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onDeleteClick: (post) => {
      dispatch(actions.handleDeleteClick({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onDeleteConfirmClick: (post) => {
      dispatch(actions.handleDeleteConfirmClick({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onCancelConfirmClick: (post) => {
      dispatch(actions.handleCancelConfirmClick({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onRequeueClick: (post) => {
      dispatch(actions.handleRequeue({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onShareNowClick: (post) => {
      dispatch(actions.handleShareNowClick({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onImageClick: (post) => {
      dispatch(actions.handleImageClick({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onImageClose: (post) => {
      dispatch(actions.handleImageClose({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onImageClickNext: (post) => {
      dispatch(actions.handleImageClickNext({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onImageClickPrev: (post) => {
      dispatch(actions.handleImageClickPrev({
        post: post.post,
        profileId: ownProps.profileId,
      }));
    },
    onDropPost: ({ dragIndex, hoverIndex, keyboardDirection, commit }) => {
      dispatch(actions.onDropPost({
        dragIndex,
        hoverIndex,
        keyboardDirection,
        commit,
        profileId: ownProps.profileId,
      }));
    },
    onUnpauseClick: () => {
      dispatch(profileSidebarActions.onUnpauseClick({ profileId: ownProps.profileId }));
    },
    onComposerPlaceholderClick: () => {
      dispatch(actions.handleComposerPlaceholderClick());
    },
    onComposerCreateSuccess: () => {
      dispatch(actions.handleComposerCreateSuccess());
    },
    onCalendarToggleClick: () => {
      dispatch(actions.handleCalendarToggle({ profileId: ownProps.profileId }));
    },
    onMiniCalendarMonthChange: (startDate, endDate) => {
      dispatch(actions.handleMiniCalendarMonthChange({
        profileId: ownProps.profileId,
        startDate,
        endDate,
      }));
    },
    onSetUpDirectPostingClick: () => {
      dispatch(generalSettingsActions.handleSetUpDirectPostingClick({
        profileId: ownProps.profileId,
      }));
    },
  }),
)(QueuedPosts);

export reducer, { actions, actionTypes } from './reducer';
export middleware from './middleware';
