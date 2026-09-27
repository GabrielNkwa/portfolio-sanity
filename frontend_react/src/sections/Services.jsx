import React from 'react';

import { imageSrcSet, imageUrl } from '../data/portfolio';
import { Label, Skeleton } from '../ui';
import styles from './Services.module.css';

const STACK = { Web: 'React / Next.js / Node', Mobile: 'iOS / Android / Flutter' };

// Two full-height panels, one per discipline, fed by the "abouts" documents.
const Services = ({ status, abouts = [] }) => (
  <section id="services" className={styles.split} aria-label="Services">
    {status !== 'ready'
      ? ['Web', 'Mobile'].map((kind) => (
          <div className={styles.panel} key={kind}>
            <Label>{STACK[kind]}</Label>
            <div>
              <h2 className={styles.name}>{kind}.</h2>
              {status === 'loading' && <Skeleton style={{ height: 72, maxWidth: 380 }} />}
            </div>
          </div>
        ))
      : abouts.map((about) => (
          <div className={styles.panel} key={about.id}>
            <Label>{STACK[about.kind]}</Label>
            {about.image && (
              <img
                className={styles.art}
                src={imageUrl(about.image, 800)}
                srcSet={imageSrcSet(about.image, [400, 800])}
                sizes="(max-width: 800px) 64vw, 32vw"
                alt=""
                loading="lazy"
              />
            )}
            <div>
              <h2 className={styles.name}>{about.kind}.</h2>
              <p className={styles.desc}>{about.description}</p>
            </div>
          </div>
        ))}
  </section>
);

export default Services;
