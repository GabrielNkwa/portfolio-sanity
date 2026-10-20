import React from 'react';

import cx from './cx';
import Icon from './Icon';
import styles from './Button.module.css';

/*
  Renders <a> when given href, otherwise <button>.
  variant: 'primary' (amber) | 'quiet' (outlined) | 'link' (text with arrow)
  arrow: true (right arrow) | 'up-right' (external link)
  size: 'md' | 'sm'
*/
const Button = ({ href, external, variant = 'primary', size = 'md', arrow = false, className, children, ...rest }) => {
  const classes = cx(styles.button, styles[variant], styles[size], className);
  const content = (
    <>
      <span>{children}</span>
      {arrow && <Icon name={arrow === 'up-right' ? 'arrowUpRight' : 'arrowRight'} className={styles.icon} />}
    </>
  );

  if (href) {
    const linkProps = external ? { target: '_blank', rel: 'noreferrer' } : {};
    return (
      <a href={href} className={classes} {...linkProps} {...rest}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {content}
    </button>
  );
};

export default Button;
