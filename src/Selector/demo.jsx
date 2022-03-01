/**
 * compact: true
 */
import React, { useRef, useState } from 'react';
import { Selector } from 'TD-materiel';
import styles from './demo.less';

const defaultList = Array(30)
  .fill()
  .map((_, i) => ({ v: i, checked: false }));

function Demo() {
  const ref = useRef(null);
  const [list, setList] = useState(defaultList);

  function handleSelect(arr) {
    setList((list) => list.map((obj, i) => ({ ...obj, checked: arr[i] })));
  }

  return (
    <div className={styles.container} ref={ref}>
      <Selector className={styles.selector} scrollRef={ref} onSelect={handleSelect} selection>
        {list.map(({ v, checked }) => (
          <div key={v} className={checked ? styles.checked : styles.item}>
            {v}
          </div>
        ))}
      </Selector>
    </div>
  );
}

export default Demo;
