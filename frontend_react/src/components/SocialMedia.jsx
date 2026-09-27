import React from 'react';
import { BsEnvelope, BsGithub } from 'react-icons/bs';

const SocialMedia = () => {
  return (
    <div className="app__social">
      <a href="https://github.com/GabrielNkwa" target="_blank" rel="noreferrer" aria-label="GitHub">
        <div>
          <BsGithub />
        </div>
      </a>
      <a href="mailto:gabrielnkwa@gmail.com" aria-label="Email">
        <div>
          <BsEnvelope />
        </div>
      </a>
    </div>
  );
};

export default SocialMedia;
