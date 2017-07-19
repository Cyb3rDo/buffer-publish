
export const settingsHeader = 'Your posting schedule for @joelgascoigne';
const times = [
  {
    value: {
      hours: 9,
      minutes: 41,
    },
    onChange: console.log('on-change'), //eslint-disable-line
    onRemoveTimeClick: console.log('on-remove-time-click'), //eslint-disable-line
  },
  {
    value: {
      hours: 19,
      minutes: 0,
    },
    onChange: console.log('on change'), //eslint-disable-line
    onRemoveTimeClick: console.log('on-remove-time-click'), //eslint-disable-line
  },
];
export const days = [
  {
    dayName: 'Monday',
    postingTimesTotal: times.length,
    times,
  },
  {
    dayName: 'Tuesday',
    postingTimesTotal: times.length,
    times,
  },
  {
    dayName: 'Wednesday',
    postingTimesTotal: times.length,
    times,
  },
  {
    dayName: 'Thursday',
    postingTimesTotal: times.length,
    times,
  },
  {
    dayName: 'Friday',
    postingTimesTotal: times.length,
    times,
  },
  {
    dayName: 'Saturday',
    postingTimesTotal: times.length,
    times,
  },
  {
    dayName: 'Sunday',
    postingTimesTotal: times.length,
    times,
  },
];

export const timezones = [
  'Pacific/Midway',
  'America/Adak',
  'America/Anchorage',
  'Pacific/Gambier',
  'America/Dawson_Creek',
  'Pacific/Auckland',
  'Pacific/Chatham',
];
