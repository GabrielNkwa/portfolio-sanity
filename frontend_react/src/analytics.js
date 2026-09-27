import { inject, track as vercelTrack } from '@vercel/analytics';

/*
  Vercel Web Analytics. Page views work on every plan once Web Analytics is
  enabled for the project; custom events (below) need a Pro plan. To switch
  provider, change these two functions only.
*/
export const startAnalytics = () => {
  // A local production preview has no /_vercel/insights endpoint; loading it there only logs a 404.
  if (import.meta.env.PROD && ['localhost', '127.0.0.1'].includes(window.location.hostname)) return;
  inject({ mode: import.meta.env.PROD ? 'production' : 'development' });
};

// Events used on the site:
//   contact_submit   { result: 'sent' | 'failed' }
//   booking_click    { from: 'hero' | 'contact' }
//   project_open     { project }            (case study dialog)
//   project_visit    { project, from }      (outbound link to a live site)
export const track = (event, props) => {
  try {
    vercelTrack(event, props);
  } catch (err) {
    // Analytics must never break the page.
  }
};
