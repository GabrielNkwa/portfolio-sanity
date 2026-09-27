import React, { forwardRef } from 'react';

import cx from './cx';
import Icon from './Icon';
import styles from './Button.module.css';

/*
  Pill button. Renders <a> when given href, otherwise <button>.
  variant: 'primary' (light, turns volt on hover) | 'volt' (for volt sections) | 'ghost'
  size: 'md' | 'sm'
*/
const Button = forwardRef(
  ({ href, external, variant = 'primary', size = 'md', arrow = false, className, children, ...rest }, ref) => {
    const classes = cx(styles.button, styles[variant], styles[size], className);
    const content = (
      <>
        <span>{children}</span>
        {arrow && <Icon name="arrowRight" className={styles.icon} />}
      </>
    );

    if (href) {
      const linkProps = external ? { target: '_blank', rel: 'noreferrer' } : {};
      return (
        <a ref={ref} href={href} className={classes} {...linkProps} {...rest}>
          {content}
        </a>
      );
    }

    return (
      <button ref={ref} type="button" className={classes} {...rest}>
        {content}
      </button>
    );
  }
);

// Round icon link used on project slides. Needs a label because it has no text.
export const IconLink = ({ href, label, className, ...rest }) => (
  <a href={href} target="_blank" rel="noreferrer" aria-label={label} className={cx(styles.iconLink, className)} {...rest}>
    <Icon name="arrowUpRight" />
  </a>
);

export default Button;
