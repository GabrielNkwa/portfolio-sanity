import React from 'react';

import styles from './Kit.module.css';

// Two rows drifting in opposite directions. The list is also in the page text for screen readers.
const Row = ({ skills, reverse }) => (
  <div className={styles.row} aria-hidden="true">
    <div className={`${styles.run} ${reverse ? styles.reverse : ''}`}>
      {[...skills, ...skills].map((skill, i) => (
        <span key={`${skill.id}-${i}`}>{skill.name}</span>
      ))}
    </div>
  </div>
);

const Kit = ({ skills = [] }) => {
  if (!skills.length) return null;
  const half = Math.ceil(skills.length / 2);

  return (
    <section className={styles.section} aria-labelledby="kit-title">
      <h2 id="kit-title" className="visually-hidden">
        Tools I ship with: {skills.map((s) => s.name).join(', ')}
      </h2>
      <Row skills={skills.slice(0, half)} />
      <Row skills={skills.slice(half).length ? skills.slice(half) : skills} reverse />
    </section>
  );
};

export default Kit;
