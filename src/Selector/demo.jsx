/**
 * compact: true
 */
import React, { useState } from 'react';
import { Selector } from 'TD-materiel';
import styles from './demo.less';

const defaultList = Array(30)
  .fill()
  .map((_, i) => ({ v: i, checked: false }));

function Demo() {
  const [list, setList] = useState(defaultList);

  function handleSelect(arr) {
    setList((list) => list.map((obj, i) => ({ ...obj, checked: arr[i] })));
  }

  return (
    <Selector
      className={styles.container}
      contentClassName={styles.content}
      onSelect={handleSelect}
    >
      {list.map(({ v, checked }) => (
        <div key={v} className={checked ? styles.checked : styles.item}>
          {v}
        </div>
      ))}
    </Selector>
  );
}

export default Demo;
