import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';

import { imageUrl } from '../data/portfolio';
import { IconLink, Label, MediaFrame, SectionHeader, Skeleton, StatusMessage } from '../ui';
import styles from './FeaturedWork.module.css';

const pad = (n) => String(n).padStart(2, '0');

const Slide = ({ work, index, active, onFocus }) => (
  <li className={styles.slide} onFocus={onFocus}>
    <MediaFrame src={imageUrl(work.image, 1600)} alt={`${work.title} screenshot`} zoom active={active} />
    <div className={styles.caption}>
      <div>
        <Label>
          {pad(index + 1)} · {work.tags.join(' / ') || work.kind}
        </Label>
        <h3 className={styles.name}>{work.title}</h3>
        {work.description && <p className={styles.desc}>{work.description}</p>}
      </div>
      {work.link && <IconLink href={work.link} label={`Open ${work.title}`} />}
    </div>
  </li>
);

const Counter = ({ current, total }) => (
  <p className={styles.count} aria-live="polite">
    <b>{pad(current + 1)}</b> / {pad(total)}
  </p>
);

/*
  Pinned rail: the section is as tall as the track is wide, the inner frame
  sticks to the viewport, and vertical scroll moves the track sideways.
*/
const PinnedRail = ({ featured }) => {
  const sectionRef = useRef(null);
  const stickRef = useRef(null);
  const trackRef = useRef(null);
  const [distance, setDistance] = useState(0);
  const [current, setCurrent] = useState(0);

  useLayoutEffect(() => {
    const measure = () => {
      if (trackRef.current) setDistance(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(trackRef.current);
    window.addEventListener('resize', measure);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, (p) => -p * distance);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setCurrent(Math.min(featured.length - 1, Math.round(p * (featured.length - 1))));
  });

  // Keyboard users tabbing into an off-screen slide: scroll the page so it slides into view.
  // Runs a frame later, after the browser's own focus scrolling, and undoes any sideways scroll it did.
  const bringIntoView = (index) => {
    const section = sectionRef.current;
    if (!section || featured.length < 2) return;
    setTimeout(() => {
      if (stickRef.current) stickRef.current.scrollLeft = 0;
      document.scrollingElement.scrollLeft = 0;
      const top = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + (index / (featured.length - 1)) * distance, behavior: 'auto' });
    }, 0);
  };

  return (
    <div ref={sectionRef} className={styles.rail} style={{ height: `calc(100dvh + ${distance}px)` }}>
      <div ref={stickRef} className={styles.stick}>
        <div className={styles.pad}>
          <SectionHeader
            id="featured-title"
            title="Featured work"
            size="md"
            aside={<Counter current={current} total={featured.length} />}
          />
        </div>
        <motion.ul ref={trackRef} className={styles.pinnedTrack} style={{ x }}>
          {featured.map((work, i) => (
            <Slide key={work.id} work={work} index={i} active={i === current} onFocus={() => bringIntoView(i)} />
          ))}
        </motion.ul>
        <div className={styles.progress} aria-hidden="true">
          <motion.i style={{ scaleX: scrollYProgress }} />
        </div>
      </div>
    </div>
  );
};

// Swipe row: used while loading, on error, and when the visitor prefers reduced motion.
const SwipeRow = ({ status, featured, onRetry }) => {
  const trackRef = useRef(null);
  const [current, setCurrent] = useState(0);

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
          <Slide key={work.id} work={work} index={i} active={i === current} />
        ))}
      </ul>
    );
  }

  return (
    <div className={styles.static}>
      <div className={styles.pad}>
        <SectionHeader
          id="featured-title"
          title="Featured work"
          size="md"
          aside={status === 'ready' && <Counter current={current} total={featured.length} />}
        />
      </div>
      {body}
    </div>
  );
};

const FeaturedWork = ({ status, works = [], onRetry }) => {
  const reduce = useReducedMotion();
  const featured = works.filter((w) => !w.portrait).slice(0, 6);
  const pinned = status === 'ready' && featured.length > 1 && !reduce;

  return (
    <section id="work" aria-labelledby="featured-title">
      {pinned ? <PinnedRail featured={featured} /> : <SwipeRow status={status} featured={featured} onRetry={onRetry} />}
    </section>
  );
};

export default FeaturedWork;
