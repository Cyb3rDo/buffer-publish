const { postsMapper } = require('../utils/postParser');
const { method } = require('@bufferapp/micro-rpc');
const { daysAgoTimestamp } = require('../utils/date');
const rp = require('request-promise');

module.exports = method(
  'sentPosts',
  'fetch sent posts',
  ({ profileId, page }, { session }) =>
    rp({
      uri: `${process.env.API_ADDR}/1/profiles/${profileId}/updates/sent.json`,
      method: 'GET',
      strictSSL: !(process.env.NODE_ENV === 'development'),
      qs: {
        access_token: session.accessToken,
        page,
        count: 20,
        since: daysAgoTimestamp(30),
      },
    })
      .then(result => JSON.parse(result))
      .then(parsedResult => ({
        total: parsedResult.total,
        updates: parsedResult.updates.map(postsMapper),
      })),
);
