import React from 'react';

import { usePortfolio } from './data/portfolio';
import Archive from './sections/Archive';
import Contact from './sections/Contact';
import Hero from './sections/Hero';
import Kit from './sections/Kit';
import Nav from './sections/Nav';
import Process from './sections/Process';
import Record from './sections/Record';
import Services from './sections/Services';
import Starfield from './sections/Starfield';
import Work from './sections/Work';

const App = () => {
  const { status, data, retry } = usePortfolio();
  const works = data?.works ?? [];

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Starfield />
      <div className="page">
        <Nav />
        <main id="main">
          <Hero />
          <Work status={status} works={works} stats={data?.stats} onRetry={retry} />
          <Archive status={status} works={works} />
          <Services status={status} abouts={data?.abouts} />
          <Process />
          <Record status={status} experiences={data?.experiences} since={data?.stats.since} onRetry={retry} />
          <Kit skills={data?.skills} />
          <Contact />
        </main>
      </div>
    </>
  );
};

export default App;
