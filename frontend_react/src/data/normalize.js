// Clean up CMS content at the edge so small data mistakes don't reach the page.

// Windows-1252 characters mapped back to their byte values.
const CP1252 = { 0x20ac: 0x80, 0x201a: 0x82, 0x192: 0x83, 0x201e: 0x84, 0x2026: 0x85, 0x2020: 0x86, 0x2021: 0x87, 0x2c6: 0x88, 0x2030: 0x89, 0x160: 0x8a, 0x2039: 0x8b, 0x152: 0x8c, 0x17d: 0x8e, 0x2018: 0x91, 0x2019: 0x92, 0x201c: 0x93, 0x201d: 0x94, 0x2022: 0x95, 0x2013: 0x96, 0x2014: 0x97, 0x2dc: 0x98, 0x2122: 0x99, 0x161: 0x9a, 0x203a: 0x9b, 0x153: 0x9c, 0x17e: 0x9e, 0x178: 0x9f };

// Some CMS text was saved as UTF-8 read back as Windows-1252, e.g. "Letâ€™s" instead of "Let’s".
export const fixText = (value) => {
  if (!value) return '';
  let out = value;
  if (/[âÃ]/.test(out)) {
    try {
      out = new TextDecoder('utf-8', { fatal: true }).decode(Uint8Array.from(out, (c) => CP1252[c.charCodeAt(0)] ?? c.charCodeAt(0)));
    } catch (e) {
      // keep the original text
    }
  }
  return out.replace(/^[•\s]+/, '').replace(/\s+/g, ' ').trim();
};

const TAG_MAP = {
  'react js': 'React',
  'react.js': 'React',
  reactjs: 'React',
  'next js': 'Next.js',
  'next.js': 'Next.js',
  nextjs: 'Next.js',
  'web app': 'Web',
  'mobile app': 'Mobile',
};

export const normalizeTags = (tags = []) => [
  ...new Set(
    tags
      .filter((tag) => tag && tag.toLowerCase() !== 'all')
      .map((tag) => TAG_MAP[tag.toLowerCase().trim()] || tag.trim())
  ),
];

// Every project is either a mobile app or a web project.
export const workKind = (tags) => (tags.includes('Mobile') ? 'Mobile' : 'Web');

export const withProtocol = (url) => {
  if (!url) return null;
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
};
