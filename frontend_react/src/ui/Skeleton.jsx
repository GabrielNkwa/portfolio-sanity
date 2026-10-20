import React from 'react';

import cx from './cx';
import styles from './Skeleton.module.css';

// Placeholder shaped like the content it stands in for.
export const Skeleton = ({ className, style }) => <div className={cx(styles.skeleton, className)} style={style} aria-hidden="true" />;

// Inline message for failed data, with an optional retry.
export const StatusMessage = ({ children, onRetry }) => (
  <div className={styles.status} role="status">
    <p>{children}</p>
    {onRetry && (
      <button type="button" className={styles.retry} onClick={onRetry}>
        Try again
      </button>
    )}
  </div>
);
