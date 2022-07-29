import React, { useState } from 'react';
import { DisableRangePicker } from 'TD-materiel';
import 'antd/dist/antd.css';

function Demo() {
  const [value, setValue] = useState(null);

  return <DisableRangePicker value={value} onChange={setValue} diffType="days" diffCount={6} />;
}

export default Demo;
