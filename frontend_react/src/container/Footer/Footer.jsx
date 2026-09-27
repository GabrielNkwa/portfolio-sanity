import React, { useState } from 'react';

import { images } from '../../constants';

import './Footer.css';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validate = ({ name, email, message }) => {
  const errors = {};
  if (name.trim().length < 2) errors.name = 'Add your name.';
  if (!EMAIL_RE.test(email.trim())) errors.email = 'Check the email address.';
  if (message.trim().length < 10) errors.message = 'Tell me a little more.';
  return errors;
};

const Footer = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    company: '', // honeypot, hidden from people
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, message, company } = formData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: undefined });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validate(formData);
    setErrors(found);
    setSubmitError('');
    if (Object.keys(found).length) return;

    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, company }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.error || 'Your message could not be sent.');
      }
      setIsFormSubmitted(true);
    } catch (err) {
      setSubmitError(`${err.message} You can also email gabrielnkwa@gmail.com.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="head-text">Feel free to contact me</h2>
      <div className="app__footer-cards">
        <div className="app__footer-card">
          <img src={images.email} alt="" />
          <a href="mailto:gabrielnkwa@gmail.com" className="p-text">
            gabrielnkwa@gmail.com
          </a>
        </div>
        <div className="app__footer-card">
          <img src={images.mobile} alt="" />
          <a href="tel:+2347044354339" className="p-text">
            +234 (704) 435-4339
          </a>
        </div>
      </div>

      {!isFormSubmitted ? (
        <form className="app__footer-form app__flex" onSubmit={handleSubmit} noValidate>
          <div className="app__flex app__footer-field">
            <input
              className="p-text"
              type="text"
              placeholder="Your Name"
              aria-label="Your name"
              name="name"
              value={name}
              onChange={handleChangeInput}
              aria-invalid={!!errors.name}
              autoComplete="name"
            />
            {errors.name && <p className="app__footer-error" role="alert">{errors.name}</p>}
          </div>
          <div className="app__flex app__footer-field">
            <input
              className="p-text"
              type="email"
              placeholder="Your Email"
              aria-label="Your email"
              name="email"
              value={email}
              onChange={handleChangeInput}
              aria-invalid={!!errors.email}
              autoComplete="email"
            />
            {errors.email && <p className="app__footer-error" role="alert">{errors.email}</p>}
          </div>
          <div className="app__footer-field">
            <textarea
              className="p-text"
              placeholder="Your Message"
              aria-label="Your message"
              value={message}
              name="message"
              onChange={handleChangeInput}
              aria-invalid={!!errors.message}
            />
            {errors.message && <p className="app__footer-error" role="alert">{errors.message}</p>}
          </div>
          <input
            className="app__footer-honeypot"
            type="text"
            name="company"
            value={company}
            onChange={handleChangeInput}
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          {submitError && <p className="app__footer-error" role="alert">{submitError}</p>}
          <button type="submit" className="p-text" disabled={loading}>
            {loading ? 'Sending…' : 'Send Message'}
          </button>
        </form>
      ) : (
        <div>
          <h3 className="head-text">Thank you for getting in touch</h3>
        </div>
      )}
    </>
  );
};

export default Footer;
