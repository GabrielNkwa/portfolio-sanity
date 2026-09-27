import { startTransition, useCallback, useEffect, useState } from 'react';

import { fetchQuery, urlFor } from '../client';
import { fixText, normalizeTags, withProtocol, workKind } from './normalize';

// One request for the whole page.
const QUERY = `{
  "works": *[_type == "works"]{ _id, title, description, projectLink, codeLink, tags, imgUrl },
  "abouts": *[_type == "abouts"] | order(_createdAt asc){ _id, title, description, imgUrl },
  "experiences": *[_type == "experiences"] | order(year desc){ _id, year, works[]{ _key, name, company, desc } },
  "skills": *[_type == "skills"] | order(_createdAt asc){ _id, name }
}`;

// Display order: strongest client work first. Unlisted projects go last.
const PRIORITY = [
  'Fantasy Pro League',
  'Pharma-AID Africa',
  'The Adjumani Project',
  'Valdin Energy',
  'GVR Labs',
  'KatchAI Studio',
  'Fantasy Pro League (app)',
  'MultiMagic',
  'HA Transmissions',
  'Hospital Management',
  'Portfolio Website',
];

// Corrections for names as they are stored in the CMS.
const TITLE_FIX = {
  Pharmaidafrica: 'Pharma-AID Africa',
  'GVR labs': 'GVR Labs',
  'KatchAi Studio': 'KatchAI Studio',
  'Fantasy Pro League Mobile App': 'Fantasy Pro League (app)',
};
const SKILL_FIX = { JavaScriptp: 'JavaScript', 'Next Js': 'Next.js', MongoDb: 'MongoDB' };
const ROLE_FIX = { 'NATIONAL YOUTH SERVICE CORP(NYSC)': 'NYSC corps member' };

// Asset refs look like "image-<hash>-1080x2220-png".
const dimensions = (image) => {
  const match = /-(\d+)x(\d+)-/.exec(image?.asset?._ref || '');
  return match ? { width: +match[1], height: +match[2] } : null;
};

// gray: desaturated by Sanity's image API, so the page doesn't run a CSS filter on it every frame.
export const imageUrl = (image, width, { gray = false } = {}) => {
  if (!image) return null;
  const url = urlFor(image).width(width).auto('format').quality(80);
  return (gray ? url.saturation(-100) : url).url();
};

// srcset string so the browser picks the smallest width that covers the slot.
export const imageSrcSet = (image, widths, options) =>
  image ? widths.map((w) => `${imageUrl(image, w, options)} ${w}w`).join(', ') : undefined;

// "DEFENCE SPACE ADMINISTRATION, ABUJA" -> "Defence Space Administration"
const companyName = (value) => {
  const name = fixText(value).split(',')[0];
  if (name !== name.toUpperCase()) return name;
  return name.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()).replace(/\bIct\b/, 'ICT');
};

const toWork = (work) => {
  const title = fixText(work.title);
  const tags = normalizeTags(work.tags);
  const description = fixText(work.description);
  const size = dimensions(work.imgUrl);
  return {
    id: work._id,
    title: TITLE_FIX[title] || title,
    // Some entries repeat the title as the description.
    description: description === title ? '' : description,
    link: withProtocol(work.projectLink),
    code: work.codeLink?.includes('github.com') ? work.codeLink : null,
    tags,
    kind: workKind(tags),
    image: work.imgUrl,
    portrait: size ? size.height > size.width : false,
  };
};

const rank = (work) => {
  const i = PRIORITY.indexOf(work.title);
  return i === -1 ? PRIORITY.length : i;
};

export const normalizePortfolio = (raw) => {
  const works = (raw.works || []).map(toWork).sort((a, b) => rank(a) - rank(b));

  const experiences = (raw.experiences || []).map((entry) => ({
    id: entry._id,
    year: entry.year,
    roles: (entry.works || []).map((role) => {
      const name = fixText(role.name);
      return {
        id: role._key,
        role: ROLE_FIX[name] || name,
        company: companyName(role.company),
        description: fixText(role.desc),
      };
    }),
  }));

  const abouts = (raw.abouts || []).map((about) => ({
    id: about._id,
    title: fixText(about.title),
    description: fixText(about.description),
    image: about.imgUrl,
    kind: /mobile/i.test(about.title) ? 'Mobile' : 'Web',
  }));

  const skills = (raw.skills || []).map((skill) => ({ id: skill._id, name: SKILL_FIX[skill.name] || skill.name }));

  const years = experiences.map((e) => +e.year).filter(Boolean);
  const since = years.length ? Math.min(...years) : null;

  return {
    works,
    experiences,
    abouts,
    skills,
    stats: {
      shipped: works.length,
      years: since ? new Date().getFullYear() - since : null,
      since,
      tools: skills.length,
      apps: works.filter((w) => w.kind === 'Mobile').length,
    },
  };
};

// status: 'loading' | 'ready' | 'error'
export const usePortfolio = () => {
  const [state, setState] = useState({ status: 'loading', data: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let ignore = false;
    setState((s) => ({ ...s, status: 'loading' }));
    fetchQuery(QUERY)
      .then((raw) => {
        if (ignore) return;
        const data = normalizePortfolio(raw);
        // Rendering every section at once is the page's longest task. As a transition,
        // React renders it in small slices and keeps the main thread responsive.
        startTransition(() => setState({ status: 'ready', data }));
      })
      .catch((err) => {
        console.error('Portfolio query failed', err);
        if (!ignore) setState({ status: 'error', data: null });
      });
    return () => {
      ignore = true;
    };
  }, [attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);
  return { ...state, retry };
};
