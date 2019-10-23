import { action } from '@storybook/addon-actions';
import { withKnobs, number, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { useIntersection } from '../';

type IntersectProps = { intersecting: boolean };

const Empty: React.FC<IntersectProps & { height?: string }> = ({ intersecting, height }) => (
  <div style={{ height, background: intersecting ? 'lightgray' : 'whitesmoke' }} />
);

Empty.defaultProps = {
  height: '120vh',
};

const Text: React.FC<IntersectProps> = ({ intersecting }) => (
  <h1 style={{ padding: '5rem 0', textAlign: 'center' }}>{intersecting ? 'intersecting!!' : 'hiding'}</h1>
);

const Overview: React.FC = () => {
  const target = React.useRef<HTMLDivElement>(null);
  const intersecting = useIntersection(
    target,
    {
      rootMargin: text('rootMargin', '0px'),
      threshold: number('threshold', 0, { range: true, min: 0, max: 1, step: 0.01 }),
    },
    action('onChange'),
  );

  const empty = <Empty intersecting={intersecting} />;

  return (
    <>
      {empty}
      <div ref={target}>
        <Text intersecting={intersecting} />
      </div>
      {empty}
    </>
  );
};

const WithThreshold: React.FC = () => {
  const target = React.useRef<HTMLDivElement>(null);
  const intersecting = useIntersection(
    target,
    {
      threshold: 0.8,
    },
    action('onChange'),
  );

  const empty = <Empty intersecting={intersecting} />;

  return (
    <>
      {empty}
      <div ref={target}>
        <Text intersecting={intersecting} />
      </div>
      {empty}
    </>
  );
};

const WithRoot: React.FC = () => {
  const root = React.useRef<HTMLDivElement>(null);
  const target = React.useRef<HTMLDivElement>(null);
  const intersecting = useIntersection(
    target,
    {
      root,
      rootMargin: '100px',
    },
    action('onChange'),
  );

  const empty = <Empty intersecting={intersecting} height="500px" />;

  return (
    <div
      ref={root}
      style={{
        overflow: 'hidden scroll',
        height: 300,
      }}>
      {empty}
      <div ref={target}>
        <Text intersecting={intersecting} />
      </div>
      {empty}
    </div>
  );
};

const WithOnce: React.FC = () => {
  const target = React.useRef<HTMLDivElement>(null);
  const intersected = useIntersection(
    target,
    {
      once: true,
    },
    action('onChange'),
  );

  const empty = <Empty intersecting={intersected} />;

  return (
    <>
      {empty}
      <div ref={target}>
        <Text intersecting={intersected} />
      </div>
      {empty}
    </>
  );
};

const WithElement: React.FC = () => {
  const [target, setTarget] = React.useState<Element | null>(null);
  const intersected = useIntersection(target, {}, action('onChange'));

  React.useEffect(() => {
    setTarget(document.getElementById('target'));
  }, []);

  const empty = <Empty intersecting={intersected} />;

  return (
    <>
      {empty}
      <p id="target">target</p>
      <Text intersecting={intersected} />
      {empty}
    </>
  );
};

storiesOf('useIntersection', module)
  .addDecorator(withKnobs)
  .add('overview', () => <Overview />)
  .add('with threshold (0.8)', () => <WithThreshold />)
  .add('with root element and rootMargin (100px)', () => <WithRoot />)
  .add('with once', () => <WithOnce />)
  .add('with element', () => <WithElement />);
