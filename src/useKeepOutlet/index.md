---
nav:
  title: hooks
  path: /hooks
group:
  title: hooks
---

## useKeepOutlet

基于 React Router v6 的 keepAlive 实现,页面跳转的时候不会重置页面,在某些场景中很有用.

## 示例

和 useOutlet 的用法一样

```javascript
import { useKeepOutlets } from 'TD-materiel';

export default () => {
  const element = useKeepOutlets();

  return element;
};
```
