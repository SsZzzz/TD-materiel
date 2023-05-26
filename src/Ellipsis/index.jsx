import { Tooltip } from 'antd';
import { useEffect, useRef, useState } from 'react';
import styles from './index.less';

export default ({ width, row = 1, children }) => {
  const ref = useRef();

  const [ellipsis, setEllipsis] = useState(false);
  const [displayText, setDisplayText] = useState(children ?? '');

  useEffect(() => {
    const computedStyle = getComputedStyle(ref.current);
    const lineHeight = computedStyle.lineHeight;
    const height = Math.round(row * parseFloat(lineHeight));
    ref.current.innerHTML = children;
    if (ref.current.clientHeight <= height) {
      setEllipsis(false);
      setDisplayText(children);
    } else {
      const text = getText(children, height);
      setEllipsis(true);
      setDisplayText(text);
    }
  }, [children, row]);

  function getText(text, height) {
    let l = 0;
    let r = text.length;
    while (l < r) {
      const mid = Math.floor((l + r) / 2);
      const str = text.slice(0, mid) + '...';
      ref.current.innerHTML = str;
      if (ref.current.clientHeight > height) {
        r = mid;
      } else {
        l = mid + 1;
      }
    }
    return text.slice(0, l - 1) + '...';
  }

  return (
    <Tooltip title={children} open={ellipsis ? undefined : false}>
      <div style={{ maxWidth: width }} className={styles.container} ref={ref}>
        {displayText}
      </div>
    </Tooltip>
  );
};
