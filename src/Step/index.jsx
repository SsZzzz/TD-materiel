import React from 'react';
import styles from './index.less';

// 自定义 step 组件,纵向排布,适用于新闻之类的
function Step({ title, description, children, color = '#1890ff' }) {
  return (
    <div className={styles.Step}>
      <div className={styles.left}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description} style={{ backgroundColor: color }}>
          {description}
        </div>
      </div>
      <div className={styles.border}>
        <div className={styles.point} style={{ backgroundColor: color }} />
      </div>
      <div className={styles.right}>{children}</div>
    </div>
  );
}

export default Step;
