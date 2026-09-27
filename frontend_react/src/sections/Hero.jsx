import React from 'react';

import { track } from '../analytics';
import { BOOKING, imageUrl } from '../data/portfolio';
import { Button, Label, MaskLine, PlaceholderBadge } from '../ui';
import styles from './Hero.module.css';

// Four drifting columns of project screenshots behind the headline.
const Mosaic = ({ works }) => {
  const shots = works.filter((w) => !w.portrait).slice(0, 8);
  if (!shots.length) return <div className={styles.mosaic} aria-hidden="true" />;

  const columns = [0, 1, 2, 3].map((c) => {
    const col = shots.filter((_, i) => i % 4 === c);
    return col.length ? col : shots.slice(0, 2);
  });

  return (
    <div className={styles.mosaic} aria-hidden="true">
      {columns.map((col, c) => (
        <div className={styles.column} key={c}>
          {/* Repeated so the drift loops without a gap. */}
          {[...col, ...col, ...col, ...col].map((w, i) => (
            <img key={`${w.id}-${i}`} src={imageUrl(w.image, 600)} alt="" loading={i < 2 ? 'eager' : 'lazy'} />
          ))}
        </div>
      ))}
    </div>
  );
};

const Hero = ({ works = [] }) => (
  <section id="top" className={styles.hero} aria-labelledby="hero-title">
    <Mosaic works={works} />
    <Label tone="strong">Gabriel Nkwa · Product engineer · Abuja</Label>
    <h1 id="hero-title" className={styles.title}>
      <MaskLine>Ship</MaskLine>
      <MaskLine delay={0.12} className={styles.volt}>
        it.
      </MaskLine>
    </h1>
    <div className={styles.meta}>
      <p>
        Web platforms and mobile apps, designed, built and launched by one engineer. Pharma-AID Africa, Valdin Energy and
        Fantasy Pro League run on my code.
      </p>
      <div className={styles.ctas}>
        {BOOKING && (
          <Button href={BOOKING.url} external variant="ghost" onClick={() => track('booking_click', { from: 'hero' })}>
            Book a 20-min call <PlaceholderBadge show={BOOKING.placeholder} />
          </Button>
        )}
        <Button href="#contact" arrow>
          Start a project
        </Button>
      </div>
    </div>
  </section>
);

export default Hero;
