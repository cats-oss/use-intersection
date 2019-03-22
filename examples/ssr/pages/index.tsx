import * as React from 'react';
import { useIntersection } from 'use-intersection';

const Empty: React.FC<{ intersecting: boolean }> = ({ intersecting }) => (
  <div style={{ height: '100vh', background: intersecting ? 'lightgray' : 'whitesmoke' }} />
);

export default () => {
  const target = React.useRef<HTMLDivElement>(null);
  const intersecting = useIntersection(target, {
    threshold: 0.5,
  });

  const empty = <Empty intersecting={intersecting} />;

  return (
    <div>
      {empty}
      <div
        ref={target}
        style={{
          padding: '5rem',
          textAlign: 'center',
        }}>
        {intersecting ? 'intersecting!!' : 'hiding'}
      </div>
      {empty}
    </div>
  );
};
