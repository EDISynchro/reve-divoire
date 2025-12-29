import React from 'react';

import Hero from './sections/Hero';
import Testimonials from './sections/Testimonials';

import ActionsConcretes from './sections/ActionsConcretes';

import Flux from './sections/Flux';
import SupportEngagement from './sections/SupportEngagement';

export default function AboutPage() {
  return (
    <>
      <main id="main">
        <Hero />
        <Flux/>
        <ActionsConcretes/>
        <Testimonials/>
         <SupportEngagement/>
      </main>
    </>
  );
}
