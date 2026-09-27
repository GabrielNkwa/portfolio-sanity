import React from 'react';
import { m } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

/*
  Fades and lifts content in the first time it scrolls into view.
  Reduced motion is handled globally by <MotionConfig reducedMotion="user">,
  which drops the transform and keeps a plain fade.
*/
const Reveal = ({ as = 'div', delay = 0, y = 60, className, children, ...rest }) => {
  const Comp = m[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Comp>
  );
};

// Line of display text that rises out of a mask, like the Volt hero.
// The visible wrapper is observed (the inner line starts clipped, so it would never
// count as "in view") and passes the state down through variants.
const rise = {
  hidden: { y: '105%' },
  shown: (delay) => ({ y: 0, transition: { duration: 1.1, ease: EASE, delay } }),
};

export const MaskLine = ({ delay = 0, className, children }) => (
  <m.span
    style={{ display: 'block', overflow: 'hidden', paddingBottom: '0.02em' }}
    className={className}
    initial="hidden"
    whileInView="shown"
    viewport={{ once: true }}
  >
    <m.span style={{ display: 'inline-block' }} variants={rise} custom={delay}>
      {children}
    </m.span>
  </m.span>
);

export default Reveal;
