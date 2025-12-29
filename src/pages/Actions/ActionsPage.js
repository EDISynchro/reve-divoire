import React from 'react';

import Hero from './sections/Hero';
import Resume from './sections/Resume';
import Actions from './sections/Actions';
import Projets from './sections/Projets';
import Contact from './sections/Contact';
import Proof from './sections/Proof';
import Participer from './sections/Participer';
import JoinUs from './sections/JoinUs';
import FAQ from './sections/FAQ';

export default function AboutPage() {
  return (
    <>
      <main id="main">
        <Hero />
        <Actions/>
        <Proof/>
        <Participer/>
        <FAQ/>
        <JoinUs/>
        <Contact />
      </main>
    </>
  );
}
