import React from 'react';
import { createRoot } from 'react-dom/client';
import { LazyMotion, MotionConfig, domAnimation } from 'framer-motion';

import App from './App';
import { startAnalytics } from './analytics';
import '@fontsource/anton/latin-400.css';
import '@fontsource-variable/archivo/wght.css';
import './styles/tokens.css';
import './styles/a11y.css';
import './styles/base.css';

startAnalytics();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Honors the OS "reduce motion" setting for every Framer Motion animation. */}
    <MotionConfig reducedMotion="user">
      {/* Loads only the animation features the site uses; `strict` fails loudly if a full motion.* component slips in. */}
      <LazyMotion features={domAnimation} strict>
        <App />
      </LazyMotion>
    </MotionConfig>
  </React.StrictMode>
);
