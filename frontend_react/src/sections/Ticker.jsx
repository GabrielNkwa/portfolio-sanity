import React from 'react';

import styles from './Ticker.module.css';

const WORDS = ['Web apps', 'Mobile apps', 'React', 'Next.js', 'Flutter', 'Node', 'Launch day'];

// Decorative marquee; the same words are in the page text for screen readers.
const Ticker = () => (
  <div className={styles.band} aria-hidden="true">
    <div className={styles.ticker}>
      <div className={styles.run}>
        {[...WORDS, ...WORDS].map((word, i) => (
          <span key={i}>{word}</span>
        ))}
      </div>
    </div>
  </div>
);

export default Ticker;
