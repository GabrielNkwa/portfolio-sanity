import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tooltip } from 'react-tooltip';

import { urlFor, client } from '../../client';
import { fixText } from '../../utils/normalize';
import './Skills.css';

// Company names stored in capitals with full street addresses become "Defence Space Administration".
const companyName = (value) => {
  const name = fixText(value).split(',')[0];
  if (name !== name.toUpperCase()) return name;
  return name.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()).replace(/\bIct\b/, 'ICT');
};

const Skills = () => {
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const query = '*[_type == "experiences"] | order(year desc)';
    const skillsQuery = '*[_type == "skills"]';

    client.fetch(query).then((data) => {
      setExperiences(data);
    });

    client.fetch(skillsQuery).then((data) => {
      setSkills(data);
    });
  }, []);

  return (
    <>
      <h2 className="head-text">Skills & Experiences</h2>

      <div className="app__skills-container">
        <motion.div className="app__skills-list">
          {skills.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={skill._id}
            >
              <div
                className="app__flex"
                style={{ backgroundColor: skill.bgColor }}
              >
                <img src={urlFor(skill.icon).width(100).auto('format').url()} alt="" />
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
        <div className="app__skills-exp">
          {experiences.map((experience) => (
            <motion.div className="app__skills-exp-item" key={experience._id}>
              <div className="app__skills-exp-year">
                <p className="bold-text">{experience.year}</p>
              </div>
              <motion.div className="app__skills-exp-works">
                {(experience.works || []).map((work) => (
                  <motion.div
                    whileInView={{ opacity: [0, 1] }}
                    transition={{ duration: 0.5 }}
                    className="app__skills-exp-work"
                    data-tooltip-id="skills-tooltip"
                    data-tooltip-content={fixText(work.desc) || undefined}
                    key={work._key}
                  >
                    <h4 className="bold-text">{fixText(work.name)}</h4>
                    <p className="p-text">{companyName(work.company)}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      <Tooltip id="skills-tooltip" className="skills-tooltip" />
    </>
  );
};

export default Skills;
