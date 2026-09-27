import React, { useEffect, useRef, useState } from 'react';
import { animate, useInView, useReducedMotion } from 'framer-motion';

import { Label } from '../ui';
import styles from './Stats.module.css';

const pad = (n) => (n == null ? '—' : String(n).padStart(2, '0'));

// Counts up from zero the first time it's on screen. Screen readers get the final value.
const CountUp = ({ value }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (value == null || !inView) return undefined;
    if (reduce) {
      setShown(value);
      return undefined;
    }
    const controls = animate(0, value, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setShown(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <span ref={ref}>
      <span aria-hidden="true">{value == null ? '—' : pad(shown)}</span>
      {value != null && <span className="visually-hidden">{value}</span>}
    </span>
  );
};

const Stats = ({ stats }) => {
  const items = [
    [stats?.shipped, 'Products shipped'],
    [stats?.years, 'Years building'],
    [stats?.tools, 'Tools in the kit'],
    [stats?.apps, 'Native apps live'],
  ];

  return (
    <section className={styles.wrap} aria-label="At a glance">
      <dl className={styles.stats}>
        {items.map(([value, label]) => (
          <div className={styles.stat} key={label}>
            <dt>
              <Label as="span">{label}</Label>
            </dt>
            <dd className={styles.value}>
              <CountUp value={value} />
              {value != null && <sup aria-hidden="true">+</sup>}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default Stats;
