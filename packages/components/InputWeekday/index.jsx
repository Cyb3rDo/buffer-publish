import React from 'react';
import PropTypes from 'prop-types';

const style = {
  display: 'flex',
};

const chooseDaysStyle = {
  marginTop: 0,
  marginRight: '1rem',
  marginBottom: 0,
  marginLeft: 0,
};

const scheduleTypes = [
  { name: 'Every Day', value: 'everyday' },
  { name: 'Weekdays', value: 'weekdays' },
  { name: 'Weekends', value: 'weekends' },
  { name: 'Monday', value: 'mon' },
  { name: 'Tuesday', value: 'tue' },
  { name: 'Wednesday', value: 'wed' },
  { name: 'Thursday', value: 'thu' },
  { name: 'Friday', value: 'fri' },
  { name: 'Saturday', value: 'sat' },
  { name: 'Sunday', value: 'sun' },
];

const InputWeekday = ({
  input: {
    value,
    onChange,
  },
  meta: {
    submitting,
  },
}) => (
  <div style={style}>
    <select
      disabled={submitting}
      onChange={e => onChange({ ...value, day: e.target.value })}
      style={chooseDaysStyle}
      value={value.day}
    >
      <optgroup label="Choose days">
        {
          scheduleTypes.map(type =>
            <option
              key={`type${type.value}`}
              value={type.value}
            >
              {type.name}
            </option>,
          )
        }
      </optgroup>
    </select>
  </div>
);

InputWeekday.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.shape({
        day: PropTypes.string.isRequired,
      }),
      PropTypes.string,
    ]),
    onChange: PropTypes.func,
  }).isRequired,
  meta: PropTypes.shape({
    submitting: PropTypes.bool,
  }),
};

InputWeekday.defaultProps = {
  meta: {},
};

export default InputWeekday;