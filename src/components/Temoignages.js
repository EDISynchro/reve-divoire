import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle, User,
  Calendar, Globe, Recycle, Handshake, RefreshCcw
 } from "lucide-react";
import frip2reveLogo from "../assets/frip2reve/logo.png";
import collecteImg from "../assets/revedivoire/image2.png";
import communauteImg from "../assets/revedivoire/image1.png";

/**
 * SectionImpactTestimonials (GAFAM style)
 * - Minimal, net, axé preuves
 * - Carousel accessible, compteurs animés, mini-cas
 * - Texte court, pas de redondance
 */

function useAutoRotate(length, delay = 6000) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    if (length <= 1) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % length), delay);
    return () => clearInterval(id);
  }, [length, delay]);
  return [index, setIndex];
}

function useCount(target, duration = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start = null;
    let raf;
    function step(ts) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.floor(progress * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return value;
}

export default function SectionImpactTestimonialsGafam({
  title = "Impact concret & témoignages",
  intro = "Retours directs des familles, chiffres simples et cas concrets.",
  stats = null,
  cases = null,
  onViewAll = () => {}
}) {

  const t = [
    {
      id: 1,
      name: "Kiki Kiana",
      quote: "Je recommande l’Association Rêve d’Ivoire pour son engagement humanitaire."
    },
    {
      id: 2,
      name: "Teens Flora",
      quote: "Bravo, vous avez tous mes encouragements dans ce magnifique combat humanitaire."
    },
    {
      id: 3,
      name: "Sarah Klp",
      quote: "Association sérieuse et engagée. 5 étoiles."
    },
    {
      id: 4,
      name: "Célina Mmu",
      quote: "Très bonne initiative de venir en aide aux enfants dans le besoin. Bravo, continuez comme cela."
    }
  ];

  const s = stats || [
    { id: 's1', label: 'Enfants accompagnés', value: 520 },
    { id: 's2', label: "Écoles équipées", value: 10 },
    { id: 's3', label: "Formations locales", value: 20 },
  ];

  const c = cases || [
    { id: 'c1', title: 'Bibliothèque villageoise', summary: 'Installation + activités de lecture hebdomadaires' },
    { id: 'c2', title: 'Kits scolaires', summary: 'Kits distribués pour 3 écoles' },
  ];

  const [index, setIndex] = useAutoRotate(t.length, 7000);

  return (
    <section aria-labelledby="impact-title" className="w-full bg-slate-50 text-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
        <header className="max-w-3xl mx-auto text-center">
         <h2 id="impact-title" className="text-2xl sm:text-3xl font-bold text-slate-900">
            {title}
          </h2>
          <p className="mt-3 text-base text-slate-600">{intro}</p>
        </header>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">

          {/* Témoignages */}
          <div className="order-2 lg:order-1">
            <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold">Témoignages</h3>
                <div className="flex items-center gap-2">
                  <button aria-label="Précédent" onClick={() => setIndex((i) => (i - 1 + t.length) % t.length)} className="p-1 rounded-md hover:bg-slate-100">
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                  <button aria-label="Suivant" onClick={() => setIndex((i) => (i + 1) % t.length)} className="p-1 rounded-md hover:bg-slate-100">
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="mt-4">
                {t.map((item, i) => (
                  <figure key={item.id} className={`${i === index ? 'block' : 'hidden'}`}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-slate-500" />
                      </div>
                      <figcaption>
                        <div className="text-sm font-medium">{item.name}</div>
                        <blockquote className="mt-1 text-sm text-slate-700">“{item.quote}”</blockquote>
                      </figcaption>
                    </div>
                  </figure>
                ))}

                <div className="mt-4 flex gap-2" role="tablist" aria-label="Sélection des témoignages">
                  {t.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      aria-label={`Voir témoignage ${i + 1}`}
                      className={`w-2 h-2 rounded-full ${i === index ? 'bg-rose-600' : 'bg-slate-300'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chiffres */}
   <div className="order-1 lg:order-2">
  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm h-full flex flex-col justify-center">
    <h3 className="text-sm font-semibold">Chiffres clés</h3>
    <p className="text-xs text-slate-600 mt-1">
      Repères factuels et transparents.
    </p>

    <ul className="mt-6 space-y-4 text-sm text-slate-700">
      <li className="flex items-start gap-3">
        <Calendar className="w-5 h-5 text-slate-500 mt-0.5" />
        <span>Association fondée en <strong>2016</strong></span>
      </li>

      <li className="flex items-start gap-3">
        <Globe className="w-5 h-5 text-slate-500 mt-0.5" />
        <span>
          Actions menées en <strong>France</strong> et en <strong>Côte d’Ivoire</strong>
        </span>
      </li>

      <li className="flex items-start gap-3">
        <Recycle className="w-5 h-5 text-slate-500 mt-0.5" />
        <span>
          Projet solidaire actif : <strong>Frip2Rêve</strong>
        </span>
      </li>

      <li className="flex items-start gap-3">
        <Handshake className="w-5 h-5 text-slate-500 mt-0.5" />
        <span>
          Partenariats avec des acteurs institutionnels et de la diaspora
        </span>
      </li>

      <li className="flex items-start gap-3">
        <RefreshCcw className="w-5 h-5 text-slate-500 mt-0.5" />
        <span>
          Association actuellement en <strong>phase de restructuration</strong>
        </span>
      </li>
    </ul>
  </div>
</div>



          {/* Mini-cas */}
         <div className="order-3 lg:order-3">
  <div className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm">
    <h3 className="text-sm font-semibold">Actions récentes & impact</h3>
    <p className="text-xs text-slate-600 mt-1">
      Initiatives actives, visibles et documentables.
    </p>

    <div className="mt-4 space-y-5">

      {/* Action 1 */}
   <div className="flex items-start gap-3">
  <div className="w-16 h-12 rounded-md bg-slate-100 flex items-center justify-center flex-shrink-0">
    <img
      src={frip2reveLogo}
      alt="Logo Frip2Rêve"
      className="max-w-full max-h-full object-contain"
    />
  </div>

  <div>
    <h4 className="text-sm font-medium">Frip2Rêve — boutique solidaire</h4>

    <p className="text-xs text-slate-600 mt-1">
      Boutique solidaire transformant les dons de vêtements en ressources pour financer les actions de l’association.
    </p>
    
  </div>
</div>


      {/* Action 2 */}
      <div className="flex items-start gap-3">
  <div className="w-16 h-12 rounded-md bg-slate-100 flex items-center justify-center flex-shrink-0">
    <img
      src={collecteImg}
      alt="Logo Frip2Rêve"
      className="max-w-full max-h-full object-contain"
    />
  </div>
        <div>
          <h4 className="text-sm font-medium">Collectes & distributions solidaires</h4>

          <p className="text-xs text-slate-600 mt-1">
            Organisation régulière de collectes et de redistributions pour répondre aux besoins essentiels des bénéficiaires.
          </p>
         
        </div>
      </div>

      {/* Action 3 */}
      <div className="flex items-start gap-3">
        <div className="w-16 h-12 rounded-md bg-slate-100 flex items-center justify-center flex-shrink-0">
    <img
      src={communauteImg}
      alt="Logo Frip2Rêve"
      className="max-w-full max-h-full object-contain"
    />
  </div>
        <div>
          <h4 className="text-sm font-medium">
            Événements solidaires & mobilisation communautaire
          </h4>

          <p className="text-xs text-slate-600 mt-1">
            Organisation d’événements solidaires pour mobiliser la diaspora et collecter des ressources.
          </p>
         
        </div>
      </div>

    </div>

    <div className="mt-4 text-center">
      <button
        onClick={onViewAll}
        className="inline-flex items-center gap-2 text-sm font-medium text-rose-600 hover:underline"
      >
        Voir toutes les actions
      </button>
    </div>
  </div>
</div>

        </div>

     
      </div>
    </section>
  );
}

function StatNumber({ value }) {
  const n = useCount(value, 900);
  return <span>{n}{value >= 100 ? '+' : ''}</span>;
}
