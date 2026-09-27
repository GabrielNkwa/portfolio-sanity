import React from 'react';

import { Label, MaskLine, Reveal, Skeleton, StatusMessage } from '../ui';
import styles from './Experience.module.css';

const Experience = ({ status, experiences = [], since, onRetry }) => {
  let body;
  if (status === 'error') {
    body = <StatusMessage onRetry={onRetry}>Experience could not be loaded.</StatusMessage>;
  } else if (status === 'loading') {
    body = [0, 1, 2].map((i) => <Skeleton key={i} style={{ height: 96, margin: '28px 0' }} />);
  } else {
    body = (
      <ol className={styles.list}>
        {experiences.map((entry) => (
          <Reveal as="li" className={styles.row} key={entry.id}>
            <p className={styles.year}>{entry.year}</p>
            <ul className={styles.roles}>
              {entry.roles.map((r) => (
                <li key={r.id}>
                  <h3 className={styles.role}>
                    {r.role} <span>/ {r.company}</span>
                  </h3>
                  {r.description && <p className={styles.desc}>{r.description}</p>}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </ol>
    );
  }

  return (
    <section id="record" className={styles.section} aria-labelledby="record-title">
      <Label>{since ? `Since ${since}` : 'Track record'}</Label>
      <h2 id="record-title" className={styles.title}>
        <MaskLine>Track record</MaskLine>
      </h2>
      {body}
    </section>
  );
};

export default Experience;
