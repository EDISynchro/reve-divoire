import React from 'react';

import Hero from './sections/Hero';
import APropos from './sections/APropos';
import ActionsProjets from './sections/ActionsProjets';
import Frip2Reve from './sections/Frip2Reve';
import Actualites from './sections/Actualites';
import Don from './sections/Don'
import Contact from './sections/Contact';
import Vision from './sections/Vision';
import Histoire from './sections/Histoire';
import Equipe from './sections/Equipe';
import CeQueNousFaisons from './sections/CeQueNousFaisons';
import ConclusionCTASection from './sections/ConclusionCTASection';
import RgpdSection from './sections/RgpdSection';
import ImpactMesureSection from './sections/ImpactMesureSection';
import TeamPartnersSection from './sections/TeamPartnersSection';
import ValuesSection from './sections/ValuesSection';
import HistoryMission from './sections/HistoryMission';
export default function AboutPage() {
  return (
    <>
      <main id="main">
        <Hero />
        <HistoryMission/>
       <ValuesSection/>
       <TeamPartnersSection/>
       <ImpactMesureSection/>
       <RgpdSection/>
       <ConclusionCTASection/>
      </main>
    </>
  );
}
