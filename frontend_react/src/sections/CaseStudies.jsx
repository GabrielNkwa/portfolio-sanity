import React from 'react';

import { track } from '../analytics';
import { imageUrl } from '../data/portfolio';
import { Button, Label, MediaFrame, PlaceholderBadge, Reveal, SectionHeader } from '../ui';
import styles from './CaseStudies.module.css';

// Up to three projects with a problem, what was built and a measured result.
const CaseStudies = ({ status, works = [], onOpen }) => {
  const studies = works.filter((w) => w.caseStudy?.featured).slice(0, 3);
  if (status !== 'ready' || !studies.length) return null;

  return (
    <section id="results" className={styles.section} aria-labelledby="results-title">
      <SectionHeader id="results-title" label="Case studies" title="Results" />
      <ol className={styles.list}>
        {studies.map((work) => {
          const cs = work.caseStudy;
          return (
            <Reveal as="li" className={styles.item} key={work.id}>
              <div className={styles.metric}>
                <p className={styles.value}>{cs.resultValue}</p>
                <p className={styles.metricLabel}>{cs.resultLabel}</p>
                <PlaceholderBadge show={cs.placeholder} />
              </div>

              <div className={styles.body}>
                <Label>{[cs.client, cs.year, cs.role].filter(Boolean).join(' · ')}</Label>
                <h3 className={styles.name}>{work.title}</h3>
                <dl className={styles.story}>
                  <div>
                    <dt>Problem</dt>
                    <dd>{cs.problem}</dd>
                  </div>
                  <div>
                    <dt>What I built</dt>
                    <dd>{cs.solution}</dd>
                  </div>
                </dl>
                <div className={styles.actions}>
                  <Button variant="ghost" size="sm" onClick={() => onOpen(work)}>
                    Project details
                  </Button>
                  {work.link && (
                    <Button
                      href={work.link}
                      external
                      size="sm"
                      arrow
                      onClick={() => track('project_visit', { project: work.title, from: 'case_study' })}
                    >
                      Visit live site
                    </Button>
                  )}
                </div>
              </div>

              <MediaFrame
                className={styles.shot}
                src={imageUrl(work.image, 900)}
                alt={`${work.title} screenshot`}
                variant={work.portrait ? 'phone' : 'screen'}
                ratio="4 / 3"
                zoom
              />
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
};

export default CaseStudies;
