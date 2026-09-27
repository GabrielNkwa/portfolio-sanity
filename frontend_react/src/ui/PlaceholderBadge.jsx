import React from 'react';

import styles from './PlaceholderBadge.module.css';

// Marks invented content during review. Placeholder data never reaches production builds.
const PlaceholderBadge = ({ show = true }) =>
  import.meta.env.DEV && show ? (
    <span className={styles.badge} title="Placeholder: replace with real content in Sanity before launch">
      Placeholder
    </span>
  ) : null;

export default PlaceholderBadge;
