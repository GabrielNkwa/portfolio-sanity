import React, { useState } from 'react';

import { Icon, Reveal, cx } from '../ui';
import styles from './Archive.module.css';

const FILTERS = ['All', 'Web', 'Mobile'];

// Every project as one compact row, filterable by Web and Mobile.
const Archive = ({ status, works = [] }) => {
  const [filter, setFilter] = useState('All');
  if (status !== 'ready' || !works.length) return null;

  const visible = filter === 'All' ? works : works.filter((w) => w.kind === filter);
  const count = (kind) => (kind === 'All' ? works.length : works.filter((w) => w.kind === kind).length);

  return (
    <section className={styles.section} aria-labelledby="archive-title">
      <div className="container">
        <Reveal className={styles.head}>
          <h2 id="archive-title" className={styles.title}>
            Everything shipped
          </h2>
          <div className={styles.filters} role="group" aria-label="Filter projects">
            {FILTERS.map((name) => (
              <button
                key={name}
                type="button"
                className={cx(styles.filter, filter === name && styles.on)}
                aria-pressed={filter === name}
                onClick={() => setFilter(name)}
              >
                {name} <span>{count(name)}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <ul className={styles.list}>
          {visible.map((work) => {
            const inner = (
              <>
                <span className={styles.name}>{work.title}</span>
                <span className={styles.tags}>{work.tags.join(', ') || work.kind}</span>
                {work.link && <Icon name="arrowUpRight" className={styles.arrow} />}
              </>
            );
            return (
              <li key={work.id}>
                {work.link ? (
                  <a className={styles.row} href={work.link} target="_blank" rel="noreferrer">
                    {inner}
                  </a>
                ) : (
                  <div className={styles.row}>{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Archive;
