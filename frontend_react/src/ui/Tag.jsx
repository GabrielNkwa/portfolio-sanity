import React from 'react';

import cx from './cx';
import styles from './Tag.module.css';

// Static label, e.g. a project's stack.
export const Tag = ({ className, children }) => <span className={cx(styles.tag, className)}>{children}</span>;

// Toggle button for filters. Pass count to show a small total.
export const Chip = ({ pressed = false, count, className, children, ...rest }) => (
  <button type="button" aria-pressed={pressed} className={cx(styles.chip, className)} {...rest}>
    {children}
    {count !== undefined && <sup className={styles.count}>{count}</sup>}
  </button>
);

// Uppercase kicker above headings.
export const Label = ({ as: Comp = 'p', tone, className, children }) => (
  <Comp className={cx(styles.label, tone === 'strong' && styles.strong, className)}>{children}</Comp>
);
