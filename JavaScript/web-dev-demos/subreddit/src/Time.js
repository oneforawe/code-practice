import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);


const Time = ({time}) => {
  const timeString = dayjs.unix(time).fromNow();
  return <span className="time">{timeString}</span>;
};

Time.propTypes = {
  time: PropTypes.number.isRequired
};

export default Time;