// Shared content loader for the three redesign prototypes.
// Reads the public Sanity dataset (no token), cleans it up, and falls back to snapshot.js.
(function () {
  const PROJECT_ID = 'rm2ky6he';
  const QUERY = `{
    "works": *[_type=="works"]|order(_createdAt desc){title,description,projectLink,codeLink,tags,"img":imgUrl.asset->url},
    "abouts": *[_type=="abouts"]{title,description,"img":imgUrl.asset->url},
    "exp": *[_type=="experiences"]|order(year desc){year,works[]{name,company,desc}},
    "skills": *[_type=="skills"]{name,"icon":icon.asset->url}
  }`;

  // Fix UTF-8 text that was saved as Latin-1 in the CMS (e.g. "Letâ€™s").
  const fixText = (s) => {
    if (!s) return '';
    let out = s;
    const CP1252 = { 0x20ac: 0x80, 0x201a: 0x82, 0x192: 0x83, 0x201e: 0x84, 0x2026: 0x85, 0x2020: 0x86, 0x2021: 0x87, 0x2c6: 0x88, 0x2030: 0x89, 0x160: 0x8a, 0x2039: 0x8b, 0x152: 0x8c, 0x17d: 0x8e, 0x2018: 0x91, 0x2019: 0x92, 0x201c: 0x93, 0x201d: 0x94, 0x2022: 0x95, 0x2013: 0x96, 0x2014: 0x97, 0x2dc: 0x98, 0x2122: 0x99, 0x161: 0x9a, 0x203a: 0x9b, 0x153: 0x9c, 0x17e: 0x9e, 0x178: 0x9f };
    try {
      if (/[âÃ]/.test(out)) out = new TextDecoder('utf-8', { fatal: true }).decode(Uint8Array.from(out, (c) => CP1252[c.charCodeAt(0)] ?? c.charCodeAt(0)));
    } catch (e) { /* leave as-is */ }
    return out.replace(/^[•\s]+/, '').replace(/\s+/g, ' ').trim();
  };

  const TAG_MAP = {
    'react js': 'React', 'react.js': 'React', 'reactjs': 'React',
    'next js': 'Next.js', 'next.js': 'Next.js', 'nextjs': 'Next.js',
    'web app': 'Web', 'mobile app': 'Mobile',
  };
  const normTag = (t) => TAG_MAP[(t || '').toLowerCase().trim()] || t;

  const titleCaseCompany = (s) => {
    const clean = fixText(s).split(',')[0];
    if (clean !== clean.toUpperCase()) return clean;
    return clean.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase()).replace(/\bIct\b/, 'ICT');
  };

  // Display order: strongest client work first.
  const PRIORITY = ['Fantasy Pro League', 'Pharma-AID Africa', 'The Adjumani Project', 'Valdin Energy', 'GVR Labs', 'KatchAI Studio', 'MultiMagic', 'HA Transmissions', 'Hospital Management', 'Portfolio Website'];
  const TITLE_FIX = { Pharmaidafrica: 'Pharma-AID Africa', 'GVR labs': 'GVR Labs', 'KatchAi Studio': 'KatchAI Studio' };

  const withProtocol = (url) => (!url ? null : /^https?:\/\//.test(url) ? url : `https://${url}`);

  const clean = (raw) => {
    const seen = new Set();
    const works = raw.works
      .map((w) => {
        const tags = [...new Set((w.tags || []).filter((t) => t !== 'All').map(normTag))];
        return {
          title: (() => { const t = fixText(w.title).replace(/ Mobile App$/, ''); return TITLE_FIX[t] || t; })(),
          description: fixText(w.description) === fixText(w.title) ? '' : fixText(w.description),
          link: withProtocol(w.projectLink),
          code: w.codeLink && w.codeLink.includes('github') ? w.codeLink : null,
          tags,
          kind: tags.includes('Mobile') ? 'Mobile' : 'Web',
          img: w.img,
          portrait: /-(\d+)x(\d+)\./.test(w.img || '') && +RegExp.$2 > +RegExp.$1,
        };
      })
      // The CMS has Fantasy Pro League twice (web + mobile); keep both but label them.
      .map((w) => {
        const key = w.title + w.kind;
        if (seen.has(key)) return null;
        seen.add(key);
        return w;
      })
      .filter(Boolean)
      .sort((a, b) => {
        const r = (w) => { const i = PRIORITY.indexOf(w.title); return (i < 0 ? 99 : i) + (w.kind === 'Mobile' && w.title === 'Fantasy Pro League' ? 5.5 : 0); };
        return r(a) - r(b);
      });

    const skills = raw.skills.map((s) => ({
      name: s.name === 'JavaScriptp' ? 'JavaScript' : s.name === 'Next Js' ? 'Next.js' : s.name === 'MongoDb' ? 'MongoDB' : s.name,
      icon: s.icon,
    }));

    const exp = raw.exp.map((e) => ({
      year: e.year,
      roles: (e.works || []).map((r) => ({
        role: fixText(r.name).replace(/\(NYSC\)|CORP\(NYSC\)/i, '').replace(/NATIONAL YOUTH SERVICE\s*/i, 'NYSC corps member').trim(),
        company: titleCaseCompany(r.company),
        desc: fixText(r.desc) === 'Flutter Developer' ? 'Built the Flutter app.' : fixText(r.desc),
      })),
    }));

    const abouts = raw.abouts.map((a) => ({ title: fixText(a.title), description: fixText(a.description), img: a.img }));
    return { works, skills, exp, abouts };
  };

  window.img = (url, w = 1400) => (url ? `${url}?w=${w}&auto=format&fit=max&q=80` : '');

  window.loadPortfolio = async function () {
    const url = `https://${PROJECT_ID}.apicdn.sanity.io/v2022-02-01/data/query/production?query=${encodeURIComponent(QUERY)}`;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(res.status);
      const { result } = await res.json();
      return { ...clean(result), source: 'live' };
    } catch (e) {
      return { ...clean(window.PORTFOLIO_SNAPSHOT), source: 'snapshot' };
    }
  };
})();
