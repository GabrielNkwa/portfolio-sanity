/*
  PLACEHOLDER CONTENT. Dev only.

  Everything here is invented so the layout can be reviewed before real
  content exists. It is only used when import.meta.env.DEV is true, so a
  production build drops it entirely. Replace it by filling in the matching
  fields in Sanity (Works → "Case study" tab, and Testimonials); CMS content
  always wins over these entries.

  Square brackets mark figures that must come from the client.
*/

export const CASE_STUDIES = {
  'Fantasy Pro League': {
    client: 'Fantasy Pro League',
    year: '2026',
    role: 'Product design, web and mobile build',
    problem:
      'EA Sports FC Clubs players had no way to track club and player performance across a season or compete on it.',
    solution:
      'A Next.js web platform and a companion mobile app that pull match results, score players weekly and run league rankings with rewards.',
    resultValue: '[00k]',
    resultLabel: '[registered players in the first season]',
  },
  'Pharma-AID Africa': {
    client: 'Pharma-AID Africa',
    year: '2025',
    role: 'Website design and build',
    problem:
      'The organisation needed a credible site to explain its supply-chain work to donors and primary health centre partners.',
    solution: 'A React site with programme pages, partner stories and a donation path, editable by the team.',
    resultValue: '[00%]',
    resultLabel: '[increase in partner enquiries after launch]',
  },
  'The Adjumani Project': {
    client: 'The Adjumani Project',
    year: '2025',
    role: 'Website design and build',
    problem: 'A nonprofit working in northern Uganda had no site to share its mission and field updates with supporters.',
    solution: 'A fast React site with a mission story, programme updates and a clear route to donate.',
    resultValue: '[0 weeks]',
    resultLabel: '[from first call to launch]',
  },
};

export const TESTIMONIALS = [
  {
    id: 'placeholder-1',
    quote: '[Two or three sentences from a client about working with Gabriel: what changed for their business and what the process was like.]',
    name: '[Client name]',
    role: '[Job title]',
    company: '[Company]',
  },
];

export const BOOKING_URL = 'https://cal.com/';
