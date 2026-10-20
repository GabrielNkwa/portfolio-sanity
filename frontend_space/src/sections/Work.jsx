import React, { createRef, useMemo } from 'react';
import { m, useScroll, useTransform } from 'framer-motion';

import { imageSrcSet, imageUrl } from '../data/portfolio';
import useMediaQuery from '../hooks/useMediaQuery';
import { Button, Reveal, Skeleton, StatusMessage, cx } from '../ui';
import styles from './Work.module.css';

const FEATURED = 6;

/*
  One project, full size. On wide screens the panels stack: each one pins under the
  nav while the next slides over it, and the one underneath recedes as the next arrives.
*/
const Panel = ({ work, index, last, stacked, selfRef, nextRef }) => {
  const { scrollYProgress: covered } = useScroll({ target: nextRef, offset: ['start end', 'start start'] });
  const { scrollYProgress: arriving } = useScroll({ target: selfRef, offset: ['start end', 'start start'] });

  const scale = useTransform(covered, [0, 0.9], [1, 0.94]);
  const dim = useTransform(covered, [0, 0.9], [0, 0.6]);
  const imgScale = useTransform(arriving, [0, 1], [1.14, 1]);

  const motion = stacked && !last;

  return (
    <li ref={selfRef} className={cx(styles.slot, stacked && styles.stacked, last && styles.lastSlot)} style={{ '--i': index }}>
      <m.article className={styles.panel} style={motion ? { scale } : undefined}>
        <div className={styles.copy}>
          <h3 className={styles.name}>{work.title}</h3>
          {work.description && <p className={styles.desc}>{work.description}</p>}
          <p className={styles.meta}>{work.tags.join(' / ') || work.kind}</p>
          {work.link && (
            <Button
              href={work.link}
              external
              arrow="up-right"
              variant="quiet"
              size="sm"
              aria-label={`Visit ${work.kind === 'Mobile' ? 'app' : 'site'} for ${work.title}`}
              className={styles.open}
            >
              Visit {work.kind === 'Mobile' ? 'app' : 'site'}
            </Button>
          )}
        </div>
        <div className={cx(styles.frame, work.portrait && styles.portrait)}>
          <m.img
            src={imageUrl(work.image, 1200)}
            srcSet={imageSrcSet(work.image, [480, 800, 1200, 1600])}
            sizes="(max-width: 900px) 90vw, 700px"
            alt={`${work.title} screenshot`}
            loading={index < 2 ? 'eager' : 'lazy'}
            decoding="async"
            style={stacked ? { scale: imgScale } : undefined}
          />
        </div>
        {motion && <m.span className={styles.dim} style={{ opacity: dim }} aria-hidden="true" />}
      </m.article>
    </li>
  );
};

const Work = ({ status, works = [], stats, onRetry }) => {
  const stacked = useMediaQuery('(min-width: 900px)');
  const featured = works.slice(0, FEATURED);
  const refs = useMemo(() => featured.map(() => createRef()), [featured.length]); // eslint-disable-line react-hooks/exhaustive-deps

  let body;
  if (status === 'error') {
    body = <StatusMessage onRetry={onRetry}>Projects could not be loaded.</StatusMessage>;
  } else if (status === 'loading') {
    body = (
      <div className={styles.loading}>
        {[0, 1].map((i) => (
          <Skeleton key={i} style={{ height: 'min(70dvh, 560px)' }} />
        ))}
      </div>
    );
  } else {
    body = (
      <ol className={styles.list}>
        {featured.map((work, i) => (
          <Panel
            key={work.id}
            work={work}
            index={i}
            last={i === featured.length - 1}
            stacked={stacked}
            selfRef={refs[i]}
            nextRef={refs[i + 1] || refs[i]}
          />
        ))}
      </ol>
    );
  }

  return (
    <section id="work" className={styles.section} aria-labelledby="work-title">
      <div className="container">
        <Reveal className={styles.head}>
          <h2 id="work-title" className={styles.title}>
            Products in production
          </h2>
          {stats?.shipped > 0 && (
            <p className={styles.sub}>
              {stats.shipped} projects shipped{stats.since ? ` since ${stats.since}` : ''}
              {stats.apps > 0 ? `, ${stats.apps} of them native mobile apps` : ''}. These are the ones I'd show a new client first.
            </p>
          )}
        </Reveal>
        {body}
      </div>
    </section>
  );
};

export default Work;
