import React from 'react';

import { Label } from '../ui';
import styles from './Stats.module.css';

const pad = (n) => (n == null ? '—' : String(n).padStart(2, '0'));

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
              {pad(value)}
              {value != null && <sup>+</sup>}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default Stats;
