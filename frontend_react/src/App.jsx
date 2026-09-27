import React, { useState } from 'react';

import { usePortfolio } from './data/portfolio';
import CaseStudies from './sections/CaseStudies';
import Contact from './sections/Contact';
import Cursor from './sections/Cursor';
import Experience from './sections/Experience';
import FeaturedWork from './sections/FeaturedWork';
import Hero from './sections/Hero';
import Nav from './sections/Nav';
import ProjectDialog from './sections/ProjectDialog';
import Services from './sections/Services';
import Stack from './sections/Stack';
import Stats from './sections/Stats';
import Testimonials from './sections/Testimonials';
import Ticker from './sections/Ticker';
import WorkIndex from './sections/WorkIndex';

const App = () => {
  const { status, data, retry } = usePortfolio();
  const [openWork, setOpenWork] = useState(null);
  const works = data?.works ?? [];

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Cursor />
      <Nav />
      <main id="main">
        <Hero works={works} />
        <Ticker />
        <Stats stats={data?.stats} />
        <FeaturedWork status={status} works={works} onRetry={retry} />
        <CaseStudies status={status} works={works} onOpen={setOpenWork} />
        <Testimonials testimonials={data?.testimonials} />
        <WorkIndex status={status} works={works} onRetry={retry} onOpen={setOpenWork} />
        <Services status={status} abouts={data?.abouts} />
        <Experience status={status} experiences={data?.experiences} since={data?.stats.since} onRetry={retry} />
        <Stack skills={data?.skills} />
        <Contact />
      </main>
      <ProjectDialog work={openWork} onClose={() => setOpenWork(null)} />
    </>
  );
};

export default App;
