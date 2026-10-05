import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { apiRouter } from './backend/src/routes/api';

dotenv.config();

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

// Basic middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Serve public static assets
app.use(express.static(path.resolve(process.cwd(), 'public')));

// Mount API routes
app.use('/api', apiRouter);

// Setup frontend server
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {}
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting server:', err);
  process.exit(1);
});
