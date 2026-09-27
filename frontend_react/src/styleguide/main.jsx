import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';

import '@fontsource/anton/latin-400.css';
import '@fontsource-variable/archivo/wght.css';
import '../styles/tokens.css';
import '../styles/a11y.css';
import '../styles/base.css';
import { Button, Chip, Field, IconLink, Label, MediaFrame, Reveal, SectionHeader, Tag } from '../ui';
import styles from './Styleguide.module.css';

const SCREEN = 'https://cdn.sanity.io/images/rm2ky6he/production/becffc1617e3c8651c004f6012d2cfb362e22261-1920x1080.png?w=1200&auto=format';
const PHONE = 'https://cdn.sanity.io/images/rm2ky6he/production/319ebe1fe76842fbf4fae550951f7a9f14e6c762-1080x2220.jpg?w=500&auto=format';

const COLORS = [
  ['--color-bg', 'Page'],
  ['--color-bg-raised', 'Raised'],
  ['--color-line', 'Line'],
  ['--color-line-strong', 'Line strong'],
  ['--color-muted', 'Muted text'],
  ['--color-text', 'Text'],
  ['--color-volt', 'Volt'],
  ['--color-error', 'Error'],
];

const TYPE = [
  ['--fs-display', 'Display', 'display', 'Every build'],
  ['--fs-display-sm', 'Display small', 'display', 'Featured work'],
  ['--fs-title', 'Title', 'display', 'Fantasy Pro League'],
  ['--fs-lede', 'Lede', 'body', 'Web platforms and mobile apps, designed, built and launched by one engineer.'],
  ['--fs-body', 'Body', 'body', 'Pharma-AID Africa strengthens primary health centre supply chains.'],
  ['--fs-label', 'Label', 'label', 'Track record'],
];

const Block = ({ title, note, children }) => (
  <section className={styles.block}>
    <div className={styles.blockHead}>
      <Label>{title}</Label>
      {note && <p className={styles.note}>{note}</p>}
    </div>
    {children}
  </section>
);

const FormDemo = ({ tone }) => {
  const [errors, setErrors] = useState({});
  const submit = (e) => {
    e.preventDefault();
    const f = e.currentTarget.elements;
    const next = {};
    if (f.name.value.trim().length < 2) next.name = 'Add your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.value)) next.email = 'Check the email address.';
    setErrors(next);
  };
  return (
    <form className={styles.form} onSubmit={submit} noValidate>
      <Field tone={tone} label="Name" name="name" placeholder="Amara Okafor" error={errors.name} />
      <Field tone={tone} label="Email" name="email" type="email" placeholder="amara@company.com" error={errors.email} />
      <Field tone={tone} label="The project" name="message" multiline placeholder="A driver app, iOS and Android, launching in January." />
      <div>
        <Button type="submit" variant={tone === 'volt' ? 'volt' : 'primary'} arrow>
          Submit to test errors
        </Button>
      </div>
    </form>
  );
};

const Styleguide = () => {
  const [filter, setFilter] = useState('All');
  const [replay, setReplay] = useState(0);

  return (
    <main id="main" className={styles.page}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SectionHeader label="Phase 2 · dev only" title="Volt system" as="h1" />

      <Block title="Color" note="Muted text is 5.6:1 on the page color, so it passes WCAG AA for body copy.">
        <div className={styles.swatches}>
          {COLORS.map(([token, name]) => (
            <div key={token} className={styles.swatch}>
              <span style={{ background: `var(${token})` }} />
              <b>{name}</b>
              <code>{token}</code>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Type" note="Anton for display, Archivo for everything else. All sizes are fluid between phone and desktop.">
        <div className={styles.typeList}>
          {TYPE.map(([token, name, kind, sample]) => (
            <div key={token} className={styles.typeRow}>
              <code>
                {name}
                <br />
                {token}
              </code>
              <p className={styles[kind]} style={{ fontSize: `var(${token})` }}>
                {sample}
              </p>
            </div>
          ))}
        </div>
      </Block>

      <Block title="Buttons" note="Hover the primary button to see the volt fill; press any button for the scale feedback.">
        <div className={styles.row}>
          <Button href="#contact" arrow>
            Start a project
          </Button>
          <Button variant="ghost">View all work</Button>
          <Button size="sm">Small</Button>
          <Button disabled>Sending…</Button>
          <IconLink href="https://www.fantasyproleague.com/" label="Open Fantasy Pro League" />
        </div>
        <div className={styles.voltPanel}>
          <Button variant="volt" arrow>
            Send it
          </Button>
        </div>
      </Block>

      <Block title="Chips, tags, labels">
        <div className={styles.row}>
          {[
            ['All', 11],
            ['Web', 9],
            ['Mobile', 2],
          ].map(([name, count]) => (
            <Chip key={name} pressed={filter === name} count={count} onClick={() => setFilter(name)}>
              {name}
            </Chip>
          ))}
        </div>
        <div className={styles.row}>
          <Tag>React</Tag>
          <Tag>Next.js</Tag>
          <Tag>Mobile</Tag>
          <Label>Gabriel Nkwa · Product engineer · Abuja</Label>
        </div>
      </Block>

      <Block title="Section header" note="The title rises out of a mask the first time it scrolls into view.">
        <SectionHeader
          key={replay}
          label="Full index"
          title="Every build"
          aside={
            <Button variant="ghost" size="sm" onClick={() => setReplay((n) => n + 1)}>
              Replay
            </Button>
          }
        />
      </Block>

      <Block title="Media frame" note="Shows a shimmer until the image loads. Hover the screen to see the zoom used by the project rail.">
        <div className={styles.media}>
          <MediaFrame src={SCREEN} alt="Fantasy Pro League website" zoom />
          <MediaFrame src={PHONE} alt="MultiMagic app" variant="phone" />
          <MediaFrame src="https://cdn.sanity.io/images/rm2ky6he/production/missing.png" alt="Broken image example" />
        </div>
      </Block>

      <Block title="Reveal" note="Content lifts in once. With reduced motion turned on in the OS, it only fades.">
        <div className={styles.row}>
          {['Web', 'Mobile', 'Launch'].map((word, i) => (
            <Reveal key={`${word}-${replay}`} delay={i * 0.12} className={styles.revealBox}>
              {word}
            </Reveal>
          ))}
        </div>
      </Block>

      <Block title="Fields · dark">
        <FormDemo tone="dark" />
      </Block>

      <Block title="Fields · volt">
        <div className={styles.voltPanel} id="contact">
          <FormDemo tone="volt" />
        </div>
      </Block>
    </main>
  );
};

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MotionConfig reducedMotion="user">
      <LazyMotion features={domAnimation} strict>
        <Styleguide />
      </LazyMotion>
    </MotionConfig>
  </React.StrictMode>
);
