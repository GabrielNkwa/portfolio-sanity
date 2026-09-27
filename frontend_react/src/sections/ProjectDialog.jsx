import React, { useEffect, useRef } from 'react';

import { track } from '../analytics';
import { imageUrl } from '../data/portfolio';
import { Button, Label, MediaFrame, PlaceholderBadge, Tag } from '../ui';
import styles from './ProjectDialog.module.css';

/*
  Slide-over with a project's details and case study.
  Native <dialog>: showModal() traps focus, Esc closes, and focus returns to the opener.
*/
const ProjectDialog = ({ work, onClose }) => {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return undefined;
    if (work && !dialog.open) {
      dialog.showModal();
      document.documentElement.style.overflow = 'hidden';
      track('project_open', { project: work.title });
    }
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [work]);

  const close = () => ref.current?.close();

  // Clicks on the backdrop land on the <dialog> element itself.
  const onClick = (e) => {
    if (e.target === ref.current) close();
  };

  const cs = work?.caseStudy;

  return (
    <dialog ref={ref} className={styles.dialog} onClose={onClose} onClick={onClick} aria-labelledby="project-dialog-title">
      {work && (
        <div className={styles.panel}>
          <div className={styles.top}>
            <Label>{[work.kind, cs?.year].filter(Boolean).join(' · ')}</Label>
            <button type="button" className={styles.close} onClick={close} aria-label="Close project details">
              ✕
            </button>
          </div>

          <h2 id="project-dialog-title" className={styles.title}>
            {work.title}
          </h2>
          <div className={styles.tags}>
            {work.tags.map((t) => (
              <Tag key={t}>{t}</Tag>
            ))}
          </div>

          <MediaFrame
            className={styles.shot}
            src={imageUrl(work.image, 1200)}
            alt={`${work.title} screenshot`}
            variant={work.portrait ? 'phone' : 'screen'}
          />

          {cs ? (
            <>
              <div className={styles.metric}>
                <p className={styles.value}>{cs.resultValue}</p>
                <p>{cs.resultLabel}</p>
                <PlaceholderBadge show={cs.placeholder} />
              </div>
              <dl className={styles.story}>
                {cs.role && (
                  <div>
                    <dt>My role</dt>
                    <dd>{cs.role}</dd>
                  </div>
                )}
                <div>
                  <dt>Problem</dt>
                  <dd>{cs.problem}</dd>
                </div>
                <div>
                  <dt>What I built</dt>
                  <dd>{cs.solution}</dd>
                </div>
              </dl>
            </>
          ) : (
            work.description && <p className={styles.desc}>{work.description}</p>
          )}

          <div className={styles.actions}>
            {work.link && (
              <Button href={work.link} external arrow onClick={() => track('project_visit', { project: work.title, from: 'dialog' })}>
                Visit live site
              </Button>
            )}
            {work.code && (
              <Button href={work.code} external variant="ghost">
                Source code
              </Button>
            )}
            <Button variant="ghost" onClick={close}>
              Back to projects
            </Button>
          </div>
        </div>
      )}
    </dialog>
  );
};

export default ProjectDialog;
