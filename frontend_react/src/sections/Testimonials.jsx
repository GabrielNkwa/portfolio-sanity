import React from 'react';

import { Label, PlaceholderBadge, Reveal } from '../ui';
import styles from './Testimonials.module.css';

const Testimonials = ({ testimonials = [] }) => {
  if (!testimonials.length) return null;

  return (
    <section className={styles.section} aria-labelledby="clients-title">
      <Label as="h2" id="clients-title">
        What clients say
      </Label>
      <div className={styles.grid}>
        {testimonials.slice(0, 2).map((t, i) => (
          <Reveal as="figure" className={styles.card} key={t.id} delay={i * 0.1}>
            <blockquote className={styles.quote}>
              <p>{t.quote}</p>
            </blockquote>
            <figcaption className={styles.who}>
              <b>{t.name}</b>
              <span>{[t.role, t.company].filter(Boolean).join(', ')}</span>
              <PlaceholderBadge show={t.placeholder} />
            </figcaption>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
