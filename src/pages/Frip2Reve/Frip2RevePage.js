import React from 'react';

import Hero from './sections/Hero';
import HowItWorks from './sections/HowItWorks';
import Produits from './sections/Produits';
import Why from './sections/Why';
import Testimonials from './sections/Testimonials';
import Partners from './sections/Partners';
import Support from './sections/Support';

export default function AboutPage() {
  return (
    <>
      <main id="main">
        <Hero />
        <HowItWorks/>
        <Produits/>
        <Why/>
        <Testimonials/>
        <Partners/>
        <Support/>
        
      </main>
    </>
  );
}
