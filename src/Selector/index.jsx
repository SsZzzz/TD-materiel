import React, { useEffect, useRef } from 'react';
import './index.less';

// interface selectorProps {
//   children: React.ReactNode;
//   selection?: boolean; // 是否可框选
//   onSelect?: (arr: Array<boolean>) => void; // 选中的回调
//   style?: React.CSSProperties;
//   itemWidth: number; // 子元素宽度
// }

const Selector = ({ className, contentClassName, children, onSelect, selection = true }) => {
  const ref = useRef(null);
  const supRef = useRef(null);

  useEffect(() => {
    if (selection) addSelection();
    else removeSelection();
    return () => {
      removeSelection();
    };
  }, [selection]);

  function removeSelection() {
    document.onmousedown = null;
  }

  function disableScroll() {
    const top = supRef.current.scrollTop;
    return function () {
      supRef.current.scrollTop = top;
    };
  }

  function addSelection() {
    document.onmousedown = function (e) {
      if (e.target !== supRef.current && e.target !== ref.current) return;
      const posX = e.clientX;
      const posY = e.clientY;
      const div = document.createElement('div');
      const scrollFn = disableScroll();

      supRef.current.addEventListener('scroll', scrollFn);
      div.className = 'TD-selector-crop';
      div.style.left = e.clientX + 'px';
      div.style.top = e.clientY + 'px';
      document.body.appendChild(div);

      document.onmousemove = function (ev) {
        div.style.left = Math.min(ev.clientX, posX) + 'px';
        div.style.top = Math.min(ev.clientY, posY) + 'px';
        div.style.width = Math.abs(posX - ev.clientX) + 'px';
        div.style.height = Math.abs(posY - ev.clientY) + 'px';
      };

      document.onmouseup = function () {
        const left = parseInt(div.style.left);
        const top = parseInt(div.style.top);
        const width = parseInt(div.style.width);
        const height = parseInt(div.style.height);
        getSelectedBox(top, left + width, top + height, left);
        supRef.current.removeEventListener('scroll', scrollFn);
        div.parentNode && div.parentNode.removeChild(div);
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }

  function getSelectedBox(top, right, bottom, left) {
    if (!top || !right || !bottom || !left) return;
    const children = ref.current?.children;
    const arr = new Array(children?.length || 0);
    children?.forEach((child, i) => {
      const {
        top: clientTop,
        right: clientRight,
        bottom: clientBottom,
        left: clientLeft,
      } = child.getBoundingClientRect(); //基于左上角
      arr[i] = isBoxInSelection(
        clientTop,
        clientRight,
        clientBottom,
        clientLeft,
        top,
        right,
        bottom,
        left,
      );
    });
    onSelect && onSelect(arr);
  }

  function isBoxInSelection(
    clientTop,
    clientRight,
    clientBottom,
    clientLeft,
    top,
    right,
    bottom,
    left,
  ) {
    if (clientTop > bottom || clientBottom < top || clientRight < left || clientLeft > right)
      return false;
    else return true;
  }

  return (
    <div className={`TD-selector-container ${className}`} ref={supRef}>
      <div className={contentClassName} ref={ref}>
        {children}
      </div>
    </div>
  );
};

export default Selector;
