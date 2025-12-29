import React from 'react';
import PropTypes from 'prop-types';
import { Users, Truck, HeartHandshake, Zap } from 'lucide-react';

// Equipe.js
// Section "L'équipe" pour la page À propos — claire, accessible et prête à l'emploi.

export default function Equipe({
  title = "L'équipe",
  members = [
    {
      key: 'natacha',
      name: "Natacha Lokpo — Fondatrice",
      role: "Porteuse du projet et coordinatrice locale",
      description:
        "Responsable de la stratégie associative, du lien avec les bénéficiaires et des prises de décision sur le terrain.",
      micro: "Natacha organise, coordonne et veille au respect des bénéficiaires.",
      imgAlt: "Natacha Lokpo — fondatrice, Rêve d'Ivoire",
      imgSrc: null,
    },
 
    {
      key: 'bénévoles',
      name: "Volontaires & partenaires locaux",
      role: "Equipe de tri, distribution et accompagnement sur place",
      description:
        "Bénévoles, associations partenaires et relais locaux — leur travail permet la continuité des collectes et la qualité des distributions.",
      micro: "Une équipe de terrain discrète et essentielle.",
      imgAlt: "Volontaires Rêve d'Ivoire — tri et distribution",
      imgSrc: null,
    },
  ],
  techPartner = {
    name: 'EDISYNCHRO',
    micro: "Propulsé par EDISYNCHRO — site et communication.",
    url: 'https://edisynchro.com',
    imgAlt: "Logo EDISYNCHRO — partenaire technique",
    imgSrc: null,
  },
}) {
  return (
    <section aria-labelledby="equipe-title" className="py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h2 id="equipe-title" className="text-xl sm:text-2xl font-extrabold text-gray-900">{title}</h2>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {members.map((m) => (
            <article key={m.key} className="flex flex-col rounded-xl border border-gray-100 bg-gray-50 p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-lg bg-white flex items-center justify-center shadow">
                  {/* Placeholder icon if image not provided */}
                  {m.imgSrc ? (
                    <img src={m.imgSrc} alt={m.imgAlt} className="w-full h-full object-cover rounded-lg" />
                  ) : (
                    <Users size={18} aria-hidden="true" className="text-[#D6453A]" />
                  )}
                </div>

                <div>
                  <div className="text-sm font-semibold text-gray-900">{m.name}</div>
                  <div className="text-xs text-gray-600">{m.role}</div>
                </div>
              </div>

              <p className="mt-3 text-xs text-gray-700">{m.description}</p>
              <p className="mt-2 text-xs text-gray-500 italic">{m.micro}</p>

              {m.researchNote && (
                <p className="mt-3 text-[11px] text-gray-400">{m.researchNote}</p>
              )}
            </article>
          ))}
        </div>

        {/* Partenaire technique */}
        <div className="mt-6 flex items-center justify-between rounded-lg border border-gray-100 bg-white p-3 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#EFE4E2] flex items-center justify-center text-[#D6453A]">
              <Zap size={18} aria-hidden="true" />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900">{techPartner.name}</div>
              <div className="text-xs text-gray-600">{techPartner.micro}</div>
            </div>
          </div>

          <div>
            <a href={techPartner.url} className="text-xs font-semibold text-[#D6453A] hover:underline" aria-label={`Voir ${techPartner.name}`}>
              Voir le partenaire
            </a>
          </div>
        </div>

        <p className="mt-4 text-xs text-gray-600">Alt image suggérés fournis pour chaque personne/élément. Si vous avez des photos (ou logos) je peux les intégrer et ajuster le layout (taille des vignettes, grille 2/3 colonnes, ou accordéons).</p>
      </div>
    </section>
  );
}

Equipe.propTypes = {
  title: PropTypes.string,
  members: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      role: PropTypes.string,
      description: PropTypes.string,
      micro: PropTypes.string,
      imgAlt: PropTypes.string,
      imgSrc: PropTypes.string,
      researchNote: PropTypes.string,
    })
  ),
  techPartner: PropTypes.shape({
    name: PropTypes.string,
    micro: PropTypes.string,
    url: PropTypes.string,
    imgAlt: PropTypes.string,
    imgSrc: PropTypes.string,
  }),
};
