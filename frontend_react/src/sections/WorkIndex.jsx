import React, { useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

import { imageUrl } from '../data/portfolio';
import useMediaQuery from '../hooks/useMediaQuery';
import { Chip, Label, MaskLine, Skeleton, StatusMessage, Tag } from '../ui';
import styles from './WorkIndex.module.css';

const FILTERS = ['All', 'Web', 'Mobile'];
const pad = (n) => String(n).padStart(2, '0');

const list = { hidden: {}, shown: { transition: { staggerChildren: 0.04 } } };
const item = {
  hidden: { opacity: 0, y: 20 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

// Screenshot that trails the cursor while hovering a row. Mouse and trackpad only.
const CursorPreview = ({ work, x, y }) => (
  <motion.div className={styles.preview} style={{ x, y }} aria-hidden="true">
    <motion.div
      className={styles.previewInner}
      initial={false}
      animate={{ opacity: work ? 1 : 0, scale: work ? 1 : 0.7 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      {work && <img src={imageUrl(work.image, 720)} alt="" />}
    </motion.div>
  </motion.div>
);

// Every project as a large typographic row, filterable by Web and Mobile.
const WorkIndex = ({ status, works = [], onRetry }) => {
  const [filter, setFilter] = useState('All');
  const [hovered, setHovered] = useState(null);
  const finePointer = useMediaQuery('(pointer: fine)');
  const reduce = useReducedMotion();
  const showPreview = finePointer && !reduce;

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const x = useSpring(px, { stiffness: 350, damping: 35 });
  const y = useSpring(py, { stiffness: 350, damping: 35 });

  const visible = filter === 'All' ? works : works.filter((w) => w.kind === filter);
  const count = (kind) => (kind === 'All' ? works.length : works.filter((w) => w.kind === kind).length);

  const onPointerMove = (e) => {
    px.set(e.clientX);
    py.set(e.clientY);
  };

  // Start at the pointer instead of springing in from the corner.
  const onPointerEnter = (e) => {
    x.jump(e.clientX);
    y.jump(e.clientY);
    onPointerMove(e);
  };

  let body;
  if (status === 'error') {
    body = <StatusMessage onRetry={onRetry}>Projects could not be loaded.</StatusMessage>;
  } else if (status === 'loading') {
    body = (
      <div aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <Skeleton key={i} style={{ height: 64, margin: '22px 0' }} />
        ))}
      </div>
    );
  } else if (!visible.length) {
    body = <StatusMessage>No {filter.toLowerCase()} projects yet.</StatusMessage>;
  } else {
    body = (
      // Keyed by filter so the stagger replays when the list changes.
      <motion.ul
        key={filter}
        className={styles.rows}
        variants={list}
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, amount: 0.1 }}
        onPointerEnter={showPreview ? onPointerEnter : undefined}
        onPointerMove={showPreview ? onPointerMove : undefined}
        onPointerLeave={() => setHovered(null)}
      >
        {visible.map((work, i) => {
          const inner = (
            <>
              <span className={styles.no}>{pad(i + 1)}</span>
              <h3 className={styles.name}>{work.title}</h3>
              <span className={styles.tags}>
                {(work.tags.length ? work.tags : [work.kind]).map((t) => (
                  <Tag key={t}>{t}</Tag>
                ))}
              </span>
            </>
          );
          return (
            <motion.li key={work.id} variants={item} onPointerEnter={() => setHovered(work)}>
              {work.link ? (
                <a className={styles.row} href={work.link} target="_blank" rel="noreferrer">
                  {inner}
                </a>
              ) : (
                <div className={styles.row}>{inner}</div>
              )}
            </motion.li>
          );
        })}
      </motion.ul>
    );
  }

  return (
    <section className={styles.section} aria-labelledby="index-title">
      <Label>Full index</Label>
      <h2 id="index-title" className={styles.title}>
        <MaskLine>Every build</MaskLine>
      </h2>
      <div className={styles.filters} role="group" aria-label="Filter projects">
        {FILTERS.map((f) => (
          <Chip key={f} pressed={filter === f} count={status === 'ready' ? count(f) : undefined} onClick={() => setFilter(f)}>
            {f}
          </Chip>
        ))}
      </div>
      {body}
      {showPreview && status === 'ready' && <CursorPreview work={hovered} x={x} y={y} />}
    </section>
  );
};

export default WorkIndex;
