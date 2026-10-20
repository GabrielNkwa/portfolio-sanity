import React, { useId } from 'react';

import cx from './cx';
import styles from './Field.module.css';

// Labelled input with an inline error. multiline renders a <textarea>.
const Field = ({ label, error, multiline = false, className, ...rest }) => {
  const id = useId();
  const errorId = `${id}-error`;
  const Control = multiline ? 'textarea' : 'input';

  return (
    <div className={cx(styles.field, error && styles.invalid, className)}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <Control
        id={id}
        className={styles.control}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        rows={multiline ? 5 : undefined}
        {...rest}
      />
      {error && (
        <p id={errorId} className={styles.error} role="alert">
          {error}
        </p>
      )}
    </div>
  );
};

export default Field;
