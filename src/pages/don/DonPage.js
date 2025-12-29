import React from 'react';

import Hero from './sections/Hero';
import Pourquoi from './sections/Pourquoi';
import FaireDon from './sections/FaireDon';
import VotreDon from './sections/VotreDon';
import Engagement from './sections/Engagement';
import TransparencySection from './sections/TransparencySection';


export default function AboutPage() {
  return (
    <>
      <main id="main">
        <Hero />
        <FaireDon/>
        <TransparencySection/>
        <VotreDon/>
        <Engagement/>
      </main>
    </>
  );
}
