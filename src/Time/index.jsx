import React, { useState, useEffect } from 'react';
import moment from 'moment';

const map = {
  0: '星期日',
  1: '星期一',
  2: '星期二',
  3: '星期三',
  4: '星期四',
  5: '星期五',
  6: '星期六',
};

function Time(props) {
  const { className } = props;

  const [time, setTime] = useState(moment());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(moment());
    });
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className={className}>
      <span>{time.format('YYYY-MM-DD')}</span>
      <span>{time.format('HH:mm:ss')}</span>
      <span>{map[time.day()]}</span>
    </div>
  );
}

export default Time;
