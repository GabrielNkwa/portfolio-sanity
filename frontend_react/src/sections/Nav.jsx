import React from 'react';

import styles from './Nav.module.css';

// `phone: false` hides a link below 700px so the bar fits; Work and Contact always stay.
const LINKS = [
  { href: '#work', label: 'Work' },
  { href: '#services', label: 'Services', phone: false },
  { href: '#contact', label: 'Contact' },
];

const Nav = () => (
  <header className={styles.nav}>
    <a className={styles.mark} href="#top" aria-label="GN, Gabriel Nkwa, back to top">
      GN
    </a>
    <nav aria-label="Primary">
      <ul className={styles.links}>
        {LINKS.map(({ href, label, phone = true }) => (
          <li key={href} className={phone ? undefined : styles.wideOnly}>
            <a href={href}>{label}</a>
          </li>
        ))}
      </ul>
    </nav>
  </header>
);

export default Nav;
