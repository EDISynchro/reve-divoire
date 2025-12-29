import React from 'react';

import Hero from './sections/Hero';
import Infos from './sections/Infos';
import Formulaire from './sections/Formulaire';
import FAQ from './sections/FAQ';
import Horaires from './sections/Horaires';
import Securite from './sections/Securite';


export default function AboutPage() {
  return (
    <>
      <main id="main">
        <Hero />
        <Formulaire/>
        <Infos/>
        <FAQ/>
      </main>
    </>
  );
}
