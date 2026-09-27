import React from 'react';

import { usePortfolio } from './data/portfolio';
import Contact from './sections/Contact';
import Experience from './sections/Experience';
import FeaturedWork from './sections/FeaturedWork';
import Hero from './sections/Hero';
import Nav from './sections/Nav';
import Services from './sections/Services';
import Stack from './sections/Stack';
import Stats from './sections/Stats';
import Ticker from './sections/Ticker';
import WorkIndex from './sections/WorkIndex';

const App = () => {
  const { status, data, retry } = usePortfolio();
  const works = data?.works ?? [];

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero works={works} />
        <Ticker />
        <Stats stats={data?.stats} />
        <FeaturedWork status={status} works={works} onRetry={retry} />
        <WorkIndex status={status} works={works} onRetry={retry} />
        <Services status={status} abouts={data?.abouts} />
        <Experience status={status} experiences={data?.experiences} since={data?.stats.since} onRetry={retry} />
        <Stack skills={data?.skills} />
        <Contact />
      </main>
    </>
  );
};

export default App;
