import { createRequire } from 'node:module';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const require = createRequire(import.meta.url);

// Serves api/contact.js during `pnpm dev`, so the contact form works locally
// the same way it does on Vercel. Production uses Vercel's own function runtime.
const localApi = (env) => ({
  name: 'local-api',
  configureServer(server) {
    Object.assign(process.env, env);
    server.middlewares.use('/api/contact', async (req, res) => {
      const chunks = [];
      for await (const chunk of req) chunks.push(chunk);
      req.body = Buffer.concat(chunks).toString() || '{}';

      res.status = (code) => { res.statusCode = code; return res; };
      res.json = (data) => { res.setHeader('Content-Type', 'application/json'); res.end(JSON.stringify(data)); };

      delete require.cache[require.resolve('./api/contact.js')];
      await require('./api/contact.js')(req, res);
    });
  },
});

export default defineConfig(({ mode }) => ({
  plugins: [react(), localApi(loadEnv(mode, process.cwd(), ''))],
  server: { port: 3000 },
  preview: { port: 3000 },
}));
