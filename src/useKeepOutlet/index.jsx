import { matchPath, useLocation, useOutlet } from 'react-router-dom';

const elementObj = {};

export default function useKeepOutlet() {
  const location = useLocation();
  const element = useOutlet();
  elementObj[location.pathname] = element;
  return (
    <>
      {Object.entries(elementObj).map(([pathname, element]) => (
        <div
          key={pathname}
          style={{
            height: '100%',
            width: '100%',
          }}
          hidden={!matchPath(location.pathname, pathname)}
        >
          {element}
        </div>
      ))}
    </>
  );
}
