import React, { useRef } from 'react';
import { m, useInView } from 'framer-motion';

import { Reveal, TrackLine, cx } from '../ui';
import styles from './Process.module.css';

// Draft copy: Gabriel confirms how he actually runs an engagement before launch.
const STEPS = [
  {
    name: 'Brief',
    text: 'We agree what ships, for whom and by when. You get a written scope and a fixed price for it before any code is written.',
  },
  {
    name: 'Build',
    text: 'Short cycles with working builds you can open and click. Web and mobile come from one engineer, so there is no handoff between teams.',
  },
  {
    name: 'Launch',
    text: 'Deployment, store submission, domains and a go-live checklist, handled. You launch with a product that is already running.',
  },
  {
    name: 'After launch',
    text: 'Bugs found after go-live are fixed. Larger changes are scoped as their own project, with the same written brief.',
  },
];

const Step = ({ step, index }) => {
  const ref = useRef(null);
  const reached = useInView(ref, { margin: '0px 0px -45% 0px' });

  return (
    <li ref={ref} className={cx(styles.step, reached && styles.reached)}>
      <span className={styles.node} aria-hidden="true" />
      <m.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <h3 className={styles.name}>
          <span className={styles.n}>{index + 1}</span>
          {step.name}
        </h3>
        <p className={styles.text}>{step.text}</p>
      </m.div>
    </li>
  );
};

const Process = () => {
  const listRef = useRef(null);

  return (
    <section id="process" className={styles.section} aria-labelledby="process-title">
      <div className={`container ${styles.layout}`}>
        <Reveal className={styles.head}>
          <h2 id="process-title" className={styles.title}>
            How a project runs
          </h2>
          <p className={styles.sub}>Fixed scope, working builds along the way, and a launch you don't have to manage.</p>
        </Reveal>
        <div className={styles.track} ref={listRef}>
          <TrackLine targetRef={listRef} className={styles.line} />
          <ol className={styles.steps}>
            {STEPS.map((step, i) => (
              <Step key={step.name} step={step} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Process;
