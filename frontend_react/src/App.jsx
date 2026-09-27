import React from 'react';
import { About, Footer, Header, Skills, Work } from './container';
import { Navbar, Section } from './components';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Section id="home" animate={false}>
          <Header />
        </Section>
        <Section id="about" bg="app__whitebg" className="app__about">
          <About />
        </Section>
        <Section id="work" bg="app__primarybg" className="app__works">
          <Work />
        </Section>
        <Section id="skills" bg="app__whitebg" className="app__skills">
          <Skills />
        </Section>
        <Section id="contact" bg="app__whitebg" className="app__footer">
          <Footer />
        </Section>
      </main>
    </div>
  );
};

export default App;
