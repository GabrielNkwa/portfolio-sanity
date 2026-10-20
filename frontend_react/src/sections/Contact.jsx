import React, { useRef, useState } from 'react';
import { m, useReducedMotion, useScroll, useTransform } from 'framer-motion';

import { Button, Field, Reveal } from '../ui';
import Horizon from './Horizon';
import styles from './Contact.module.css';

const EMAIL = 'gabrielnkwa@gmail.com';
const PHONE = { href: 'tel:+2347044354339', label: '+234 704 435 4339' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = ({ name, email, message }) => {
  const errors = {};
  if (name.trim().length < 2) errors.name = 'Add your name.';
  if (!EMAIL_RE.test(email.trim())) errors.email = 'Check the email address.';
  if (message.trim().length < 10) errors.message = 'Tell me a little more.';
  return errors;
};

const ContactForm = () => {
  const [values, setValues] = useState({ name: '', email: '', message: '', company: '' });
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle'); // idle | sending | sent | failed
  const [failure, setFailure] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((errs) => ({ ...errs, [name]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) return;

    setState('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.error || 'Your message could not be sent.');
      }
      setState('sent');
    } catch (err) {
      setFailure(err.message);
      setState('failed');
    }
  };

  if (state === 'sent') {
    return (
      <div className={styles.sent} role="status">
        <h3>Message received.</h3>
        <p>I'll reply within one working day.</p>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <Field label="Name" name="name" autoComplete="name" value={values.name} onChange={onChange} error={errors.name} />
      <Field label="Work email" name="email" type="email" autoComplete="email" value={values.email} onChange={onChange} error={errors.email} />
      <Field
        label="What needs to launch, and by when?"
        name="message"
        multiline
        value={values.message}
        onChange={onChange}
        error={errors.message}
      />
      {/* Honeypot: hidden from people, filled by bots, ignored by the API. */}
      <input className="visually-hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" name="company" value={values.company} onChange={onChange} />
      {state === 'failed' && (
        <p className={styles.failure} role="alert">
          {failure} Email me at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
      )}
      <div className={styles.submit}>
        <Button type="submit" arrow disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : 'Send message'}
        </Button>
        <p>I reply within one working day.</p>
      </div>
    </form>
  );
};

const Contact = () => {
  const ref = useRef(null);
  // The planet rises into view as you reach the end of the page.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end end'] });
  const rise = useTransform(scrollYProgress, [0.45, 1], [useReducedMotion() ? 0 : 180, 0]);

  return (
    <section id="contact" ref={ref} className={styles.contact} aria-labelledby="contact-title">
      <div className={`container ${styles.grid}`}>
        <Reveal className={styles.info}>
          <h2 id="contact-title" className={styles.title}>
            Tell me what needs to launch.
          </h2>
          <p className={styles.sub}>
            A few lines on the product, the deadline and the team is enough. Booking projects for Q4 2026.
          </p>
          <div className={styles.links}>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a href={PHONE.href}>{PHONE.label}</a>
          </div>
        </Reveal>
        <Reveal className={styles.card} delay={0.1}>
          <ContactForm />
        </Reveal>
      </div>

      <div className={styles.arrival}>
        <m.div className={styles.rise} style={{ y: rise }}>
          <Horizon />
        </m.div>
        <footer className={`container ${styles.footer}`}>
          <span>© {new Date().getFullYear()} Gabriel Nkwa</span>
          <a href="https://github.com/GabrielNkwa" target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
