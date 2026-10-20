// Vercel serverless function: stores a contact message in Sanity.
// Requires the SANITY_WRITE_TOKEN environment variable (Editor token) in the Vercel project.

const PROJECT_ID = process.env.SANITY_PROJECT_ID || 'rm2ky6he';
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (value, max) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};

  // Honeypot: real visitors never fill the hidden "company" field.
  if (body.company) return res.status(200).json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const message = clean(body.message, 5000);

  const errors = {};
  if (name.length < 2) errors.name = 'Add your name.';
  if (!EMAIL_RE.test(email)) errors.email = 'Check the email address.';
  if (message.length < 10) errors.message = 'Tell me a little more.';
  if (Object.keys(errors).length) return res.status(400).json({ errors });

  const token = process.env.SANITY_WRITE_TOKEN;
  if (!token) {
    console.error('SANITY_WRITE_TOKEN is not set');
    return res.status(500).json({ error: 'The form is not configured yet. Please email me directly.' });
  }

  const response = await fetch(`https://${PROJECT_ID}.api.sanity.io/v2022-02-01/data/mutate/production`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ mutations: [{ create: { _type: 'contact', name, email, message } }] }),
  });

  if (!response.ok) {
    console.error('Sanity mutate failed', response.status, await response.text());
    return res.status(502).json({ error: 'Your message could not be saved. Please email me directly.' });
  }

  return res.status(200).json({ ok: true });
};
