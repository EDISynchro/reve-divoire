import Hero from '../components/Hero';
import Support from '../components/SectionSupport';
import Realisations from '../components/Realisations';
import Frip2Reve from '../components/Frip2Reve';
import Temoignages from '../components/Temoignages';
import CTA from '../components/CTA';
import SectionConcreteActions from '../components/SectionConcreteActions'

export default function Home() {
  return (
    <>
      <Hero />
      <SectionConcreteActions/>
      <Realisations/>
      <Frip2Reve/>
      <Temoignages/>
      <CTA/>
    </>
  );
}
