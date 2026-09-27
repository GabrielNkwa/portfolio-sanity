import React, { useState } from 'react';

import { track } from '../analytics';
import { BOOKING } from '../data/portfolio';
import { Button, Field, Label, MaskLine, PlaceholderBadge } from '../ui';
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
      track('contact_submit', { result: 'sent' });
    } catch (err) {
      track('contact_submit', { result: 'failed' });
      setFailure(err.message);
      setState('failed');
    }
  };

  if (state === 'sent') {
    return (
      <p className={styles.sent} role="status">
        Got it. I'll reply within one working day.
      </p>
    );
  }

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate>
      <Field tone="volt" label="Name" name="name" autoComplete="name" value={values.name} onChange={onChange} error={errors.name} />
      <Field
        tone="volt"
        label="Email"
        name="email"
        type="email"
        autoComplete="email"
        value={values.email}
        onChange={onChange}
        error={errors.email}
      />
      <Field tone="volt" label="The project" name="message" multiline value={values.message} onChange={onChange} error={errors.message} />
      {/* Honeypot: hidden from people, filled by bots, ignored by the API. */}
      <input className="visually-hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" name="company" value={values.company} onChange={onChange} />
      {state === 'failed' && (
        <p className={styles.failure} role="alert">
          {failure} Email me at <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
        </p>
      )}
      <div>
        <Button type="submit" variant="volt" arrow disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : 'Send it'}
        </Button>
      </div>
    </form>
  );
};

const Contact = () => (
  <section id="contact" className={styles.contact} aria-labelledby="contact-title">
    <Label tone="strong">Now booking Q4 2026</Label>
    <h2 id="contact-title" className={styles.title}>
      <MaskLine>Let's go.</MaskLine>
    </h2>
    <div className={styles.grid}>
      <div className={styles.info}>
        <p>Send a few lines about the product, the deadline and the team. I reply within one working day.</p>
        <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        <a href={PHONE.href}>{PHONE.label}</a>
        {BOOKING && (
          <div className={styles.booking}>
            <p>Prefer to talk it through?</p>
            <Button href={BOOKING.url} external variant="volt" arrow onClick={() => track('booking_click', { from: 'contact' })}>
              Book a 20-min call
            </Button>
            <PlaceholderBadge show={BOOKING.placeholder} />
          </div>
        )}
      </div>
      <ContactForm />
    </div>
    <footer className={styles.footer}>
      <span>© {new Date().getFullYear()} Gabriel Nkwa</span>
      <a href="https://github.com/GabrielNkwa" target="_blank" rel="noreferrer">
        GitHub ↗
      </a>
    </footer>
  </section>
);

export default Contact;
