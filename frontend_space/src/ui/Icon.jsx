import React from 'react';

// Stroke icons drawn for this site; sized by font-size via 1em.
const paths = {
  arrowRight: 'M1 8h13M9 3l5 5-5 5',
  arrowUpRight: 'M3 13L13 3M5 3h8v8',
};

const Icon = ({ name, className }) => (
  <svg className={className} width="1em" height="1em" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d={paths[name]} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default Icon;
