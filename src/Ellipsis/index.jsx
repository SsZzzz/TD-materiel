import React from 'react';
import { Tooltip } from 'antd';

const Ellipsis = (props) => {
  const { children, length = 10 } = props;
  if (!children) return <span></span>;
  if (children.length <= length) return <span>{children}</span>;
  return (
    <Tooltip placement="top" title={children}>
      <span>{children.slice(0, length)}...</span>
    </Tooltip>
  );
};

export default Ellipsis;
