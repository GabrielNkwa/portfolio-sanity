import imageUrlBuilder from '@sanity/image-url';

// Read-only access to the public dataset. A plain fetch against the CDN API
// replaces @sanity/client, which added ~50 KB of JavaScript for one GET request.
// Writes (contact form) go through /api/contact, which holds the token server-side.
const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 'rm2ky6he';
const dataset = 'production';
const apiVersion = 'v2022-02-01';

export const fetchQuery = async (query) => {
  const url = `https://${projectId}.apicdn.sanity.io/${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sanity query failed with ${res.status}`);
  const body = await res.json();
  return body.result;
};

const builder = imageUrlBuilder({ projectId, dataset });

export const urlFor = (source) => builder.image(source);
