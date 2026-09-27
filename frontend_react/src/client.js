import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

// Read-only client. The dataset is public, so no token belongs in the browser.
// Writes (contact form) go through /api/contact, which holds the token server-side.
export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'rm2ky6he',
  dataset: 'production',
  apiVersion: '2022-02-01',
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
