import React from 'react';

import { Label } from '../ui';
import styles from './Stack.module.css';

const Stack = ({ skills = [] }) => {
  if (!skills.length) return null;
  return (
    <section className={styles.section} aria-labelledby="kit-title">
      <Label as="h2" id="kit-title" className={styles.label}>
        Kit
      </Label>
      <ul className={styles.list}>
        {skills.map((s) => (
          <li key={s.id}>{s.name}</li>
        ))}
      </ul>
    </section>
  );
};

export default Stack;
