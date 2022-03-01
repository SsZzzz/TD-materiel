/**
 * compact: true
 */
import React, { useRef } from 'react';
import { Selector } from 'TD-materiel';
import styles from './demo.less';

function Demo() {
  const ref = useRef(null);

  function handleSelect(arr) {
    console.log(arr);
  }

  return (
    <div className={styles.container} ref={ref}>
      <Selector className={styles.selector} scrollRef={ref} onSelect={handleSelect} selection>
        {Array(20)
          .fill()
          .map((_, i) => (
            <div key={i} className={styles.item}>
              {i}
            </div>
          ))}
      </Selector>
    </div>
  );
}

export default Demo;
