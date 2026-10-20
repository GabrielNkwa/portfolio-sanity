import React from 'react';
import { useReducedMotion } from 'framer-motion';

import { Reveal, Skeleton, cx } from '../ui';
import styles from './Services.module.css';

const COPY = {
  Web: { title: 'Web platforms', stack: 'React / Next.js / Node' },
  Mobile: { title: 'Mobile apps', stack: 'iOS / Android / Flutter' },
};

// Rings drawn in code. Web: concentric orbits. Mobile: tilted orbits around the app.
const RINGS = {
  Web: [
    { rx: 34, ry: 34, rot: 0, dur: 16 },
    { rx: 60, ry: 60, rot: 0, dur: 24, reverse: true },
    { rx: 88, ry: 88, rot: 0, dur: 36 },
  ],
  Mobile: [
    { rx: 46, ry: 18, rot: -28, dur: 18 },
    { rx: 72, ry: 28, rot: -28, dur: 26, reverse: true },
    { rx: 92, ry: 36, rot: -28, dur: 34 },
  ],
};

// Closed elliptical path starting at the right-hand vertex, drawn in the given direction.
const ringPath = ({ rx, ry, reverse }) => {
  const sweep = reverse ? 0 : 1;
  return `M ${100 + rx} 100 A ${rx} ${ry} 0 1 ${sweep} ${100 - rx} 100 A ${rx} ${ry} 0 1 ${sweep} ${100 + rx} 100`;
};

const Orbits = ({ kind }) => {
  const reduce = useReducedMotion();
  return (
    <svg className={styles.orbits} viewBox="0 0 200 200" fill="none" aria-hidden="true">
      {RINGS[kind].map((ring, i) => (
        <g key={i} transform={`rotate(${ring.rot} 100 100)`}>
          <ellipse cx="100" cy="100" rx={ring.rx} ry={ring.ry} stroke="rgba(255,255,255,0.14)" strokeWidth="0.8" />
          <circle cx={100 + ring.rx} cy="100" r={i === 1 ? 2.6 : 2} fill={i === 0 ? '#f2a65a' : '#f5f5f7'}>
            {!reduce && <animateMotion dur={`${ring.dur}s`} repeatCount="indefinite" path={ringPath(ring)} />}
          </circle>
        </g>
      ))}
      <circle cx="100" cy="100" r="9" fill="#f2a65a" />
      <circle cx="100" cy="100" r="18" stroke="rgba(242,166,90,0.35)" strokeWidth="0.8" />
    </svg>
  );
};

const Panel = ({ kind, description, index }) => (
  <Reveal as="article" className={cx(styles.panel, index === 1 && styles.second)} delay={index * 0.12}>
    <Orbits kind={kind} />
    <div className={styles.text}>
      <h3 className={styles.name}>{COPY[kind].title}</h3>
      {description ? <p className={styles.desc}>{description}</p> : <Skeleton style={{ height: 72, maxWidth: 360 }} />}
      <p className={styles.stack}>{COPY[kind].stack}</p>
    </div>
  </Reveal>
);

// Two disciplines, one engineer. Descriptions come from the CMS "abouts" documents.
const Services = ({ status, abouts = [] }) => {
  const kinds = ['Web', 'Mobile'];
  const byKind = Object.fromEntries(abouts.map((a) => [a.kind, a.description]));

  return (
    <section id="services" className={styles.section} aria-labelledby="services-title">
      <div className="container">
        <Reveal className={styles.head}>
          <h2 id="services-title" className={styles.title}>
            One engineer for both sides of the product
          </h2>
          <p className={styles.sub}>Web and mobile come from the same person, so nothing is lost between teams.</p>
        </Reveal>
        <div className={styles.grid}>
          {kinds.map((kind, i) => (
            <Panel key={kind} kind={kind} index={i} description={status === 'ready' ? byKind[kind] : ''} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
