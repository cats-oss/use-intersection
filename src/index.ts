import { useRef, useState, useEffect } from 'react';
import shallowEqual from 'shallowequal';

export type IntersectionChangeHandler = (entry: IntersectionObserverEntry) => void;

export type IntersectionOptions = {
  root?: React.RefObject<Element>;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
  defaultIntersecting?: boolean;
};

export const useIntersection = (
  target: React.RefObject<Element> | Element | null,
  options: IntersectionOptions = {},
  callback?: IntersectionChangeHandler,
) => {
  const { defaultIntersecting, once, ...opts } = options;
  const optsRef = useRef(opts);
  const [intersecting, setIntersecting] = useState(defaultIntersecting === true);
  const intersectedRef = useRef(false);

  useEffect(() => {
    if (!shallowEqual(optsRef.current, opts)) {
      optsRef.current = opts;
    }
  });

  useEffect(() => {
    if (target == null) {
      return;
    }

    const element = target instanceof Element ? target : target.current;
    if (element == null) {
      return;
    }

    if (once && intersectedRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[entries.length - 1];
        setIntersecting(entry.isIntersecting);

        if (callback != null) {
          callback(entry);
        }

        if (entry.isIntersecting) {
          intersectedRef.current = true;
        }

        if (once && entry.isIntersecting && element != null) {
          observer.unobserve(element);
        }
      },
      {
        ...optsRef.current,
        root: optsRef.current.root != null ? optsRef.current.root.current : null,
      },
    );

    observer.observe(element);

    return () => {
      if (once && intersectedRef.current) {
        return;
      }

      if (element != null) {
        observer.unobserve(element);
      }
    };
  }, [optsRef.current, target]);

  return intersecting;
};
