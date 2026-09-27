import React, { useEffect, useState } from 'react';
import { m, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

import useMediaQuery from '../hooks/useMediaQuery';
import styles from './Cursor.module.css';

const INTERACTIVE = 'a, button, [role="button"], input, textarea, label';

/*
  Volt dot that trails the pointer and grows over interactive elements.
  Decorative: the system cursor stays visible, and touch devices never render it.
*/
const Cursor = () => {
  const finePointer = useMediaQuery('(pointer: fine)');
  const reduce = useReducedMotion();
  const [big, setBig] = useState(false);
  const [visible, setVisible] = useState(false);

  const px = useMotionValue(-100);
  const py = useMotionValue(-100);
  const spring = reduce ? { stiffness: 2000, damping: 100 } : { stiffness: 500, damping: 40, mass: 0.6 };
  const x = useSpring(px, spring);
  const y = useSpring(py, spring);

  useEffect(() => {
    if (!finePointer) return undefined;
    const move = (e) => {
      px.set(e.clientX);
      py.set(e.clientY);
      setVisible(true);
    };
    const over = (e) => setBig(Boolean(e.target.closest?.(INTERACTIVE)));
    const leave = () => setVisible(false);

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over);
    document.documentElement.addEventListener('pointerleave', leave);
    return () => {
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      document.documentElement.removeEventListener('pointerleave', leave);
    };
  }, [finePointer, px, py]);

  if (!finePointer) return null;

  return (
    <m.div className={styles.cursor} style={{ x, y }} aria-hidden="true">
      <m.span
        className={styles.dot}
        initial={false}
        animate={{ scale: big ? 6 : 1, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </m.div>
  );
};

export default Cursor;
