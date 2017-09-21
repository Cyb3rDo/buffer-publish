import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  CloseIcon,
  InputTime,
} from '@bufferapp/components';
import { calculateStyles } from '@bufferapp/components/lib/utils';
import TableCell from '../../TableCell';

const style = {
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const iconWrapperStyle = {
  marginTop: '0.1rem',
};

/* eslint-disable react/prop-types */

const RemoveButton = ({ onRemoveTimeClick }, buttonStyle) =>
  <div style={buttonStyle}>
    <Button onClick={onRemoveTimeClick} noStyle label="remove time">
      <div style={iconWrapperStyle}>
        <CloseIcon size={'small'} />
      </div>
    </Button>
  </div>;

const TableCellContents = ({
  disabled,
  hovered,
  select24Hours,
  time,
  onUpdateTime,
}) => {
  const buttonStyle = calculateStyles({
    default: {
      opacity: 0,
      position: 'absolute',
      right: '0.5rem',
    },
    hovered: {
      opacity: '1',
    },
    disabled: {
      opacity: '0',
    },
  }, {
    hovered,
    disabled,
  });
  return (
    <div style={style}>
      <div
        style={{
          width: '4.5rem',
          display: 'flex',
          height: '2rem',
          alignItems: 'center',
        }}
      >
        <InputTime
          disabled={disabled}
          input={time}
          select24Hours={select24Hours}
          minimal
          centerText
          displayTimeColon
        />
      </div>
      {RemoveButton(time, buttonStyle)}
    </div>
  );
};
/* eslint-enable react/prop-types */
const dayMap = {
  Monday: 'mon',
  Tuesday: 'tue',
  Wednesday: 'wed',
  Thursday: 'thu',
  Friday: 'fri',
  Saturday: 'sat',
  Sunday: 'sun',
};

const ScheduleTableCell = ({
  disabled,
  select24Hours,
  time,
  onUpdateTime,
  dayName,
  timeIndex,
}) => (
  <TableCell>
    <TableCellContents
      disabled={disabled}
      select24Hours={select24Hours}
      time={{
        ...time,
        onChange: ({ hours, minutes }) => {
          onUpdateTime(hours, minutes, dayMap[dayName], timeIndex);
        },
      }}
    />
  </TableCell>
  );

ScheduleTableCell.defaultProps = {
  disabled: false,
  select24Hours: false,
};

ScheduleTableCell.propTypes = {
  disabled: PropTypes.bool.isRequired,
  select24Hours: PropTypes.bool.isRequired,
  onUpdateTime: PropTypes.func.isRequired,
  dayName: PropTypes.string.isRequired,
  timeIndex: PropTypes.number.isRequired,
  time: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.shape({
        hours: PropTypes.number.isRequired,
        minutes: PropTypes.number.isRequired,
      }),
      PropTypes.string,
    ]),
    onChange: PropTypes.func,
    onRemoveTimeClick: PropTypes.func,
  }).isRequired,
};

export default ScheduleTableCell;
