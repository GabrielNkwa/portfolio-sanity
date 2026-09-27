import React, { useState } from 'react';

import { Chip, Label, MaskLine, Skeleton, StatusMessage, Tag } from '../ui';
import styles from './WorkIndex.module.css';

const FILTERS = ['All', 'Web', 'Mobile'];
const pad = (n) => String(n).padStart(2, '0');

// Every project as a large typographic row, filterable by Web and Mobile.
const WorkIndex = ({ status, works = [], onRetry }) => {
  const [filter, setFilter] = useState('All');
  const visible = filter === 'All' ? works : works.filter((w) => w.kind === filter);
  const count = (kind) => (kind === 'All' ? works.length : works.filter((w) => w.kind === kind).length);

  let body;
  if (status === 'error') {
    body = <StatusMessage onRetry={onRetry}>Projects could not be loaded.</StatusMessage>;
  } else if (status === 'loading') {
    body = (
      <div aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} style={{ height: 64, margin: '22px 0' }} />
        ))}
      </div>
    );
  } else if (!visible.length) {
    body = <StatusMessage>No {filter.toLowerCase()} projects yet.</StatusMessage>;
  } else {
    body = (
      <ul className={styles.rows}>
        {visible.map((work, i) => {
          const inner = (
            <>
              <span className={styles.no}>{pad(i + 1)}</span>
              <h3 className={styles.name}>{work.title}</h3>
              <span className={styles.tags}>
                {(work.tags.length ? work.tags : [work.kind]).map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </span>
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
    );
  }

  return (
    <section className={styles.section} aria-labelledby="index-title">
      <Label>Full index</Label>
      <h2 id="index-title" className={styles.title}>
        <MaskLine>Every build</MaskLine>
      </h2>
      <div className={styles.filters} role="group" aria-label="Filter projects">
        {FILTERS.map((f) => (
          <Chip key={f} pressed={filter === f} count={status === 'ready' ? count(f) : undefined} onClick={() => setFilter(f)}>
            {f}
          </Chip>
        ))}
      </div>
      {body}
    </section>
  );
};

export default WorkIndex;
