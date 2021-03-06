const { rpc } = require('@bufferapp/buffer-rpc');

const profilesMethod = require('./profiles');
const queuedPostsMethod = require('./queuedPosts');
const sentPostsMethod = require('./sentPosts');
const draftPostsMethod = require('./draftPosts');
const userMethod = require('./user');
const deletePostMethod = require('./deletePost');
const sharePostNowMethod = require('./sharePostNow');
const enabledApplicationModesMethod = require('./enabledApplicationModes');
const composerApiProxyMethod = require('./composerApiProxy');
const environmentMethod = require('./environment');
const updateScheduleMethod = require('./updateSchedule');
const getTimezonesMethod = require('./getTimezones');
const updateTimezoneMethod = require('./updateTimezone');
const reorderPostsMethod = require('./reorderPosts');
const pauseQueueMethod = require('./pauseQueue');
const requeuePost = require('./requeuePost');
const updatePausedSchedules = require('./updatePausedSchedules');
const sendFeedback = require('./sendFeedback');
const savePublishBetaRedirect = require('./savePublishBetaRedirect');
const performanceTrackingMethod = require('./performanceTracking');
const upgradeToPro = require('./upgradeToPro');
const updateEmail = require('./updateEmail');
const changePassword = require('./changePassword');
const changeDateTimePreferences = require('./changeDateTimePreferences');
const twoFactorUpdate = require('./twoFactorUpdate');
const twoFactorConfirm = require('./twoFactorConfirm');
const twoFactorRecovery = require('./twoFactorRecovery');
const closeAccount = require('./closeAccount');
const connectedApps = require('./connectedApps');
const revokeConnectedApp = require('./revokeConnectedApp');
const getNumberOfPostsMethod = require('./getNumberPosts');
const featureMethod = require('./features');
const getLinkShortener = require('./getLinkShortener');
const changeLinkShortener = require('./changeLinkShortener');
const approveDraftMethod = require('./approveDraft');
const changeDraftStatusMethod = require('./changeDraftStatus');
const toggleGoogleAnalytics = require('./toggleGoogleAnalytics');
// Analytics from Analyze -- Delete when we switch to Analyze
const analyticsStartDate = require('./analytics/analyticsStartDate');
const average = require('./analytics/average');
const compare = require('./analytics/compare');
const getReport = require('./analytics/getReport');
const hourly = require('./analytics/hourly');
const posts = require('./analytics/posts');
const summaryMethod = require('./analytics/summary');

module.exports = rpc(
  profilesMethod,
  queuedPostsMethod,
  sentPostsMethod,
  draftPostsMethod,
  userMethod,
  deletePostMethod,
  sharePostNowMethod,
  enabledApplicationModesMethod,
  composerApiProxyMethod,
  environmentMethod,
  updateScheduleMethod,
  getTimezonesMethod,
  updateTimezoneMethod,
  reorderPostsMethod,
  pauseQueueMethod,
  requeuePost,
  updatePausedSchedules,
  sendFeedback,
  savePublishBetaRedirect,
  performanceTrackingMethod,
  upgradeToPro,
  updateEmail,
  changePassword,
  changeDateTimePreferences,
  twoFactorUpdate,
  twoFactorConfirm,
  twoFactorRecovery,
  closeAccount,
  connectedApps,
  revokeConnectedApp,
  getNumberOfPostsMethod,
  featureMethod,
  getLinkShortener,
  changeLinkShortener,
  approveDraftMethod,
  changeDraftStatusMethod,
  toggleGoogleAnalytics,
  analyticsStartDate,
  average,
  compare,
  getReport,
  hourly,
  posts,
  summaryMethod,
);
