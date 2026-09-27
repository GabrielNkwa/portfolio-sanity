import React from 'react';
import { createRoot } from 'react-dom/client';
import { MotionConfig } from 'framer-motion';

import App from './App';
import { startAnalytics } from './analytics';
import './styles/tokens.css';
import './styles/a11y.css';
import './styles/base.css';

startAnalytics();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Honors the OS "reduce motion" setting for every Framer Motion animation. */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </React.StrictMode>
);
