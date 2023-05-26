import styles from './index.less';

export default ({ onClick }) => {
  return (
    <div className={styles.backContainer}>
      <button className={styles.button} type="button" onClick={onClick}>
        <div className={styles.circle} aria-hidden="true">
          <div className={styles.icon}></div>
        </div>
        <span className={styles.buttonText}>返回上一级</span>
      </button>
    </div>
  );
};
