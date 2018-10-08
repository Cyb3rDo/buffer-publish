const profileRouteRegex = /profile\/(\w+)\/tab\/(\w+)/;
export const getProfilePageParams = ({ path }) => {
  const match = profileRouteRegex.exec(path);
  if (!match) {
    return null;
  }
  return {
    profileId: match[1],
    tabId: match[2],
  };
};

export const generateProfilePageRoute = ({ profileId, tabId = 'queue'}) =>
  `/profile/${profileId}/tab/${tabId}`;

export const profilePageRoute = generateProfilePageRoute({
  profileId: ':profileId',
  tabId: ':tabId',
});

export const generateChildTabRoute = ({ profileId, tabId = 'queue', childTabId = 'general'}) =>
    `profile/${profileId}/tab/${tabId}/${childTabId}`;

export const childTabRoute = generateChildTabRoute({
    profileId: ':profileId',
    tabId: ':tabId',
    childTabId: ':childTabId',
});


export const generatePreferencePageRoute = ({ preferenceId }) =>
  `/preferences/${preferenceId}`;

export const preferencePageRoute = generatePreferencePageRoute({
  preferenceId: ':preferenceId',
});

const preferenceRouteRegex = /preferences\/(\w+)/;
export const getPreferencePageParams = ({ path }) => {
  const match = preferenceRouteRegex.exec(path);
  if (!match) {
    return null;
  }
  return {
    preferenceId: match[1],
  };
};
