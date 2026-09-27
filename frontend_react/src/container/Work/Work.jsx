import React, { useState, useEffect } from 'react';
import { AiFillEye, AiFillGithub } from 'react-icons/ai';
import { motion } from 'framer-motion';

import { AppWrap, MotionWrap } from '../../wrapper';
import { urlFor, client } from '../../client';
import { fixText, normalizeTags, workKind, withProtocol } from '../../utils/normalize';
import './Work.css';

const FILTERS = ['All', 'Web', 'Mobile'];

const toWork = (work) => {
  const tags = normalizeTags(work.tags);
  return {
    ...work,
    title: fixText(work.title),
    description: fixText(work.description),
    projectLink: withProtocol(work.projectLink),
    codeLink: withProtocol(work.codeLink),
    tags,
    kind: workKind(tags),
  };
};

const Work = () => {
  const [works, setWorks] = useState([]);
  const [filterWork, setFilterWork] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const query = '*[_type == "works"] | order(_createdAt desc)';

    client.fetch(query)
      .then((data) => {
        const cleaned = (data || []).map(toWork);
        setWorks(cleaned);
        setFilterWork(cleaned);
      })
      .catch((err) => {
        console.error('Failed to fetch works:', err);
        setError('Projects could not be loaded. Please refresh the page.');
      })
      .finally(() => setLoading(false));
  }, []);

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard({ y: 100, opacity: 0 });

    setTimeout(() => {
      setAnimateCard({ y: 0, opacity: 1 });
      setFilterWork(item === 'All' ? works : works.filter((work) => work.kind === item));
    }, 500);
  };

  let content;
  if (loading) {
    content = <p className="p-text app__work-status">Loading projects…</p>;
  } else if (error) {
    content = <p className="p-text app__work-status">{error}</p>;
  } else if (!filterWork.length) {
    content = <p className="p-text app__work-status">No projects in this category yet.</p>;
  } else {
    content = (
      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {filterWork.map((work) => (
          <div className="app__work-item app__flex" key={work._id}>
            <div className="app__work-img app__flex">
              <img src={urlFor(work.imgUrl).width(700).auto('format').url()} alt={`Screenshot of ${work.title}`} loading="lazy" />

              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{
                  duration: 0.25,
                  ease: 'easeInOut',
                  staggerChildren: 0.5,
                }}
                className="app__work-hover app__flex"
              >
                {work.projectLink && (
                  <a href={work.projectLink} target="_blank" rel="noreferrer" aria-label={`Open ${work.title}`}>
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, 0.9] }}
                      transition={{ duration: 0.25 }}
                      className="app__flex"
                    >
                      <AiFillEye />
                    </motion.div>
                  </a>
                )}
                {work.codeLink && (
                  <a href={work.codeLink} target="_blank" rel="noreferrer" aria-label={`Source code for ${work.title}`}>
                    <motion.div
                      whileInView={{ scale: [0, 1] }}
                      whileHover={{ scale: [1, 0.9] }}
                      transition={{ duration: 0.25 }}
                      className="app__flex"
                    >
                      <AiFillGithub />
                    </motion.div>
                  </a>
                )}
              </motion.div>
            </div>

            <div className="app__work-content app__flex">
              <h4 className="bold-text">{work.title}</h4>
              {work.description && (
                <p className="p-text" style={{ marginTop: 10 }}>
                  {work.description}
                </p>
              )}

              <div className="app__work-tag app__flex">
                <p className="p-text">{work.tags.join(' · ') || work.kind}</p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    );
  }

  return (
    <>
      <h2 className="head-text">
        My Creative <span>Portfolio</span> Section
      </h2>

      <div className="app__work-filter">
        {FILTERS.map((item) => (
          <button
            type="button"
            key={item}
            onClick={() => handleWorkFilter(item)}
            aria-pressed={activeFilter === item}
            className={`app__work-filter-item app__flex p-text ${
              activeFilter === item ? 'item-active' : ''
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {content}
    </>
  );
};

export default AppWrap(
  MotionWrap(Work, 'app__works'),
  'work',
  'app__primarybg'
);
