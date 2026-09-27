import React, { useState } from 'react';

import cx from './cx';
import styles from './MediaFrame.module.css';

/*
  Screenshot frame with a skeleton until the image loads.
  variant: 'screen' (landscape, cropped from the top) | 'phone' (portrait app screenshot in a device outline)
  zoom: slow zoom-out on hover or when `active` is set (used by the project rail)
*/
const MediaFrame = ({ src, srcSet, sizes, alt, ratio = '16 / 9', variant = 'screen', zoom = false, active = false, className }) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  return (
    <figure
      className={cx(styles.frame, styles[variant], zoom && styles.zoom, active && styles.active, !loaded && !failed && styles.loading, className)}
      style={variant === 'screen' ? { aspectRatio: ratio } : undefined}
    >
      {failed ? (
        <span className={styles.fallback}>Preview unavailable</span>
      ) : (
        <img
          src={src}
          srcSet={srcSet}
          sizes={sizes}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      )}
    </figure>
  );
};

export default MediaFrame;
