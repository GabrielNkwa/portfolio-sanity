import React from 'react';
import { m, useScroll, useSpring } from 'framer-motion';

import cx from './cx';
import styles from './Motion.module.css';

const EASE = [0.16, 1, 0.3, 1];

/*
  Fades and lifts content in the first time it scrolls into view. Reduced motion is
  handled globally by <MotionConfig reducedMotion="user">, which keeps a plain fade.
*/
export const Reveal = ({ as = 'div', delay = 0, y = 28, className, children, ...rest }) => {
  const Comp = m[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
};

// Headline whose words resolve out of a blur on load, one after another.
export const Words = ({ text, delay = 0, className }) => (
  <span className={className} style={{ display: 'block' }}>
    <span className="visually-hidden">{text}</span>
    {text.split(' ').map((word, i) => (
      <m.span
        key={`${word}-${i}`}
        aria-hidden="true"
        style={{ display: 'inline-block', whiteSpace: 'pre' }}
        initial={{ opacity: 0, y: '0.35em', filter: 'blur(14px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.08 }}
      >
        {`${word} `}
      </m.span>
    ))}
  </span>
);

/*
  Hairline that fills with amber as the section scrolls past. `targetRef` is the
  section that owns the line; position the track with `className`.
*/
export const TrackLine = ({ targetRef, className }) => {
  const { scrollYProgress } = useScroll({ target: targetRef, offset: ['start 65%', 'end 55%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });
  return (
    <span className={cx(styles.track, className)} aria-hidden="true">
      <m.span className={styles.fill} style={{ scaleY }} />
    </span>
  );
};
