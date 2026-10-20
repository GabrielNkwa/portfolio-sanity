import React from 'react';

import cx from '../ui/cx';
import styles from './Horizon.module.css';

// A planet's curved edge lit from behind. Pure CSS; sits at the bottom of its parent.
const Horizon = ({ className }) => (
  <div className={cx(styles.horizon, className)} aria-hidden="true">
    <div className={styles.haze} />
    <div className={styles.planet} />
  </div>
);

export default Horizon;
