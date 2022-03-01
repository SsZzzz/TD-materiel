import React, { useState } from 'react';
import { DatePicker } from 'antd';

const { RangePicker } = DatePicker;

// diffType: years、months、weeks、days、hours、minutes 和 seconds
// diffCount: number类型
function DisableRangePicker({ value, onChange, diffType = 'days', diffCount = 6, ...props }) {
  const [dates, setDates] = useState([]);
  const [hackValue, setHackValue] = useState();

  function disabledDate(current) {
    if (!dates || dates.length === 0) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], diffType) > diffCount;
    const tooEarly = dates[1] && dates[1].diff(current, diffType) > diffCount;
    return tooEarly || tooLate;
  }

  function onOpenChange(open) {
    if (open) {
      setHackValue([]);
      setDates([]);
    } else {
      setHackValue(undefined);
    }
  }

  return (
    <RangePicker
      value={hackValue || value}
      disabledDate={disabledDate}
      onCalendarChange={(val) => setDates(val)}
      onChange={onChange}
      onOpenChange={onOpenChange}
      {...props}
    />
  );
}

export default DisableRangePicker;
