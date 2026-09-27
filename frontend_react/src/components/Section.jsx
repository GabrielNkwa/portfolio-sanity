import React from 'react';
import { motion } from 'framer-motion';

import NavigationDots from './NavigationDots';
import SocialMedia from './SocialMedia';

// Page section shell: social rail, content column, copyright and navigation dots.
// Replaces the old AppWrap + MotionWrap higher-order components.
const Section = ({ id, bg = '', className = '', animate = true, children }) => {
  const content = animate ? (
    <motion.div
      whileInView={{ y: [100, 50, 0], opacity: [0, 0, 1] }}
      transition={{ duration: 0.5 }}
      className={`${className} app__flex`}
    >
      {children}
    </motion.div>
  ) : (
    children
  );

  return (
    <section id={id} className={`app__container ${bg}`}>
      <SocialMedia />

      <div className="app__wrapper app__flex">
        {content}

        <div className="copyright">
          <p className="p-text">© {new Date().getFullYear()} Gabriel Nkwa</p>
          <p className="p-text">All rights reserved</p>
        </div>
      </div>

      <NavigationDots active={id} />
    </section>
  );
};

export default Section;
