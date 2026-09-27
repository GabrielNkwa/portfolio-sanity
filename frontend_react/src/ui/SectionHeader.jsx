import React from 'react';

import cx from './cx';
import { Label } from './Tag';
import { MaskLine } from './Reveal';
import styles from './SectionHeader.module.css';

/*
  Kicker label + display heading, with optional content on the right (filters, counters).
  size: 'lg' (section titles) | 'md' (inside pinned rails)
*/
const SectionHeader = ({ label, title, as: Heading = 'h2', size = 'lg', id, aside, className }) => (
  <header className={cx(styles.header, className)}>
    <div>
      {label && <Label className={styles.label}>{label}</Label>}
      <Heading id={id} className={cx(styles.title, styles[size])}>
        <MaskLine>{title}</MaskLine>
      </Heading>
    </div>
    {aside && <div className={styles.aside}>{aside}</div>}
  </header>
);

export default SectionHeader;
