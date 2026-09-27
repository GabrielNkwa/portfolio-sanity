import React from 'react';

import styles from './Nav.module.css';

const LINKS = [
  ['#work', 'Work'],
  ['#results', 'Results'],
  ['#services', 'Services'],
  ['#contact', 'Contact'],
];

const Nav = () => (
  <header className={styles.nav}>
    <a className={styles.mark} href="#top" aria-label="Gabriel Nkwa, back to top">
      GN
    </a>
    <nav aria-label="Primary">
      <ul className={styles.links}>
        {LINKS.map(([href, label]) => (
          <li key={href}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  </header>
);

export default Nav;
