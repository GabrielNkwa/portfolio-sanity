import React, { useRef, useState } from 'react';

import { imageUrl } from '../data/portfolio';
import { IconLink, Label, MediaFrame, SectionHeader, Skeleton, StatusMessage } from '../ui';
import styles from './FeaturedWork.module.css';

const pad = (n) => String(n).padStart(2, '0');

/*
  Horizontal row of the strongest landscape projects.
  Phase 3: native swipe/scroll with snap points. Phase 4 pins it and drives it from vertical scroll.
*/
const FeaturedWork = ({ status, works = [], onRetry }) => {
  const trackRef = useRef(null);
  const [current, setCurrent] = useState(0);
  const featured = works.filter((w) => !w.portrait).slice(0, 6);

  const onScroll = () => {
    const track = trackRef.current;
    const slide = track?.firstElementChild;
    if (!slide) return;
    const step = slide.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 0);
    setCurrent(Math.min(featured.length - 1, Math.round(track.scrollLeft / step)));
  };

  let body;
  if (status === 'error') {
    body = (
      <div className={styles.pad}>
        <StatusMessage onRetry={onRetry}>Projects could not be loaded.</StatusMessage>
      </div>
    );
  } else if (status === 'loading') {
    body = (
      <div className={styles.track} aria-hidden="true">
        {[0, 1].map((i) => (
          <div className={styles.slide} key={i}>
            <Skeleton style={{ aspectRatio: '16 / 9' }} />
            <Skeleton style={{ height: 48, width: '60%', marginTop: 18 }} />
          </div>
        ))}
      </div>
    );
  } else {
    body = (
      <ul className={styles.track} ref={trackRef} onScroll={onScroll} tabIndex={0} aria-label="Featured projects, scroll sideways">
        {featured.map((work, i) => (
          <li className={styles.slide} key={work.id}>
            <MediaFrame src={imageUrl(work.image, 1600)} alt={`${work.title} screenshot`} zoom active={i === current} />
            <div className={styles.caption}>
              <div>
                <Label>
                  {pad(i + 1)} · {work.tags.join(' / ') || work.kind}
                </Label>
                <h3 className={styles.name}>{work.title}</h3>
                {work.description && <p className={styles.desc}>{work.description}</p>}
              </div>
              {work.link && <IconLink href={work.link} label={`Open ${work.title}`} />}
            </div>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section id="work" className={styles.section} aria-labelledby="featured-title">
      <div className={styles.pad}>
        <SectionHeader
          id="featured-title"
          title="Featured work"
          size="md"
          aside={
            status === 'ready' && (
              <p className={styles.count} aria-live="polite">
                <b>{pad(current + 1)}</b> / {pad(featured.length)}
              </p>
            )
          }
        />
      </div>
      {body}
    </section>
  );
};

export default FeaturedWork;
