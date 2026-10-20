import React, { useRef } from 'react';

import { Reveal, Skeleton, StatusMessage, TrackLine } from '../ui';
import styles from './Record.module.css';

const Record = ({ status, experiences = [], since, onRetry }) => {
  const listRef = useRef(null);

  let body;
  if (status === 'error') {
    body = <StatusMessage onRetry={onRetry}>Experience could not be loaded.</StatusMessage>;
  } else if (status === 'loading') {
    body = [0, 1, 2].map((i) => <Skeleton key={i} style={{ height: 96, marginBottom: 20 }} />);
  } else {
    body = (
      <div className={styles.track} ref={listRef}>
        <TrackLine targetRef={listRef} className={styles.line} />
        <ol className={styles.list}>
          {experiences.map((entry) => (
            <Reveal as="li" className={styles.row} key={entry.id}>
              <span className={styles.node} aria-hidden="true" />
              <p className={styles.year}>{entry.year}</p>
              <ul className={styles.roles}>
                {entry.roles.map((r) => (
                  <li key={r.id}>
                    <h3 className={styles.role}>
                      {r.role} <span>at {r.company}</span>
                    </h3>
                    {r.description && <p className={styles.desc}>{r.description}</p>}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <section id="record" className={styles.section} aria-labelledby="record-title">
      <div className="container">
        <Reveal className={styles.head}>
          <h2 id="record-title" className={styles.title}>
            Track record
          </h2>
          {since && <p className={styles.sub}>Building software professionally since {since}.</p>}
        </Reveal>
        {body}
      </div>
    </section>
  );
};

export default Record;
