import { Checkbox, Space } from 'antd';

export default ({ style, options, value = [], onChange }) => {
  function handleCheckAllChange(e) {
    onChange(e.target.checked ? options.map(({ value }) => value) : []);
  }
  return (
    <Space style={style} direction="vertical">
      <Checkbox
        indeterminate={value.length > 0 && value.length < options.length}
        onChange={handleCheckAllChange}
        checked={value.length === options.length}
      >
        全选
      </Checkbox>
      <Checkbox.Group options={options} value={value} onChange={onChange} />
    </Space>
  );
};
