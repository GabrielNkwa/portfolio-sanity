import React, { useRef } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';

import { Button, Words } from '../ui';
import Horizon from './Horizon';
import styles from './Hero.module.css';

const EASE = [0.16, 1, 0.3, 1];

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  // The planet falls away as you leave; the copy lifts and fades.
  const planetY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section id="top" ref={ref} className={styles.hero} aria-labelledby="hero-title">
      <m.div className={styles.planet} style={{ y: planetY }}>
        <Horizon />
      </m.div>

      <m.div className={`container ${styles.copy}`} style={{ y: copyY, opacity: copyOpacity }}>
        <h1 id="hero-title" className={styles.title}>
          <Words text="Web and mobile products," />
          <Words text="built and launched." delay={0.35} />
        </h1>
        <m.p
          className={styles.lede}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1 }}
        >
          I'm Gabriel Nkwa, a project engineer in Abuja. I design, build and ship web platforms and mobile apps for startups,
          from first spec to production.
        </m.p>
        <m.div
          className={styles.actions}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1.15 }}
        >
          <Button href="#contact" arrow>
            Book an intro call
          </Button>
          <Button href="#work" variant="link" arrow>
            See shipped work
          </Button>
        </m.div>
        <m.p
          className={styles.proof}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 1.5 }}
        >
          In production: Pharma-AID Africa, Valdin Energy and Fantasy Pro League.
        </m.p>
      </m.div>
    </section>
  );
};

export default Hero;
