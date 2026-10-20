import React, { useEffect, useState } from 'react';

import { Button } from '../ui';
import styles from './Nav.module.css';

// `phone: false` hides a link below 720px so the bar fits.
const LINKS = [
  { id: 'work', label: 'Work' },
  { id: 'services', label: 'Services', phone: false },
  { id: 'process', label: 'Process', phone: false },
  { id: 'record', label: 'Record', phone: false },
];

const Mark = () => (
  <svg className={styles.mark} width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <ellipse cx="11" cy="11" rx="10" ry="4.2" transform="rotate(-24 11 11)" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="11" cy="11" r="3.2" fill="var(--color-accent)" />
  </svg>
);

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Marks the link for the section that crosses the upper third of the viewport.
  useEffect(() => {
    const sections = ['top', ...LINKS.map(({ id }) => id), 'contact'].map((id) => document.getElementById(id)).filter(Boolean);
    if (!sections.length) return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  });

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a className={styles.brand} href="#top" aria-label="Gabriel Nkwa, back to top">
          <Mark />
          <span>Gabriel Nkwa</span>
        </a>
        <nav aria-label="Primary" className={styles.links}>
          <ul>
            {LINKS.map(({ id, label, phone = true }) => (
              <li key={id} className={phone ? undefined : styles.wideOnly}>
                <a href={`#${id}`} aria-current={active === id ? 'true' : undefined}>
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Button href="#contact" size="sm" className={styles.cta}>
          Book <span className={styles.wideOnly}>an intro </span>call
        </Button>
      </div>
    </header>
  );
};

export default Nav;
