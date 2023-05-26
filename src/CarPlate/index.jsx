import { message } from 'antd';
import copy from 'copy-to-clipboard';
import styles from './index.less';

export default ({ value }) => {
  const vehicleLicense = transformDictCode(value, 'vehicle_license');
  const [licenseNumber, color] = vehicleLicense.split('_');
  const index = color === '白色' ? 1 : 2;
  const location = licenseNumber.slice(0, index);
  const number = licenseNumber.slice(index);

  const colorObj = {
    蓝色: styles.blue,
    黄色: styles.yellow,
    黑色: styles.black,
    白色: styles.white,
    渐变绿色: styles.whiteGreen,
    黄绿双拼色: styles.yellowGreen,
    蓝白渐变色: styles.blueWhite,
    临时牌照: styles.gray,
    未确定: styles.blue,
    绿色: styles.green,
    红色: styles.red,
  };

  function handleCopy() {
    copy(licenseNumber);
    message.success(`${licenseNumber}车牌号复制成功!`);
  }

  return (
    <div className={colorObj[color]} onClick={handleCopy}>
      <div className={styles.inner}>
        <div>{location}</div>
        <span>·</span>
        <div>{number}</div>
      </div>
    </div>
  );
};
