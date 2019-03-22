import { useRef, useState, useEffect } from 'react';
import shallowEqual from 'shallowequal';

export type IntersectionChangeHandler = (entry: IntersectionObserverEntry) => void;

export type IntersectionOptions = {
  root?: React.RefObject<Element>;
  rootMargin?: string;
  threshold?: number | number[];
  defaultIntersecting?: boolean;
};

export const useIntersection = (
  ref: React.RefObject<Element>,
  options: IntersectionOptions = {},
  callback?: IntersectionChangeHandler,
) => {
  const { defaultIntersecting, ...opts } = options;
  const optsRef = useRef(opts);
  const [intersecting, setIntersecting] = useState(defaultIntersecting === true);

  useEffect(() => {
    if (!shallowEqual(optsRef.current, opts)) {
      optsRef.current = opts;
    }
  });

  useEffect(() => {
    if (ref.current == null) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting);
        if (callback != null) {
          callback(entry);
        }
      },
      {
        ...optsRef.current,
        root: optsRef.current.root != null ? optsRef.current.root.current : null,
      },
    );

    observer.observe(ref.current);

    return () => {
      if (ref.current != null) {
        observer.unobserve(ref.current);
      }
    };
  }, [optsRef.current]);

  return intersecting;
};
