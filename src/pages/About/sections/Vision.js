import React from 'react';
import PropTypes from 'prop-types';
import { Handshake, Eye, Repeat, MapPin } from 'lucide-react';

// Section: Notre vision & nos valeurs
// Objectif: présenter identité, valeurs et motivation — micro-copy UX claire et concise
export default function Vision({
  surtitre = "Ce qui nous motive au quotidien",
  title = "Une vision simple : aider avec humanité, clarté et impact",
  intro = "Notre action repose sur des valeurs fortes qui orientent chaque collecte, chaque redistribution et chaque projet mené pour les familles et les enfants. Ces valeurs sont le socle de notre engagement depuis le premier jour.",
  values = [
    {
      key: 'solidarite',
      title: 'Solidarité',
      text: "Agir avec respect, dignité et bienveillance, pour que chaque aide soit réellement utile.",
      Icon: Handshake,
      note: "Aide adaptée — toujours penser à la dignité des bénéficiaires.",
    },
    {
      key: 'transparence',
      title: 'Transparence',
      text: "Chaque don est tracé, expliqué et montré. Vous savez comment il est utilisé et qui il aide.",
      Icon: Eye,
      note: "Rapports clairs, photos de terrain et suivi projet par projet.",
    },
    {
      key: 'durabilite',
      title: 'Durabilité',
      text: "Donner une seconde vie aux vêtements, éviter le gaspillage et soutenir une économie solidaire.",
      Icon: Repeat,
      note: "Réparer, redistribuer, réemployer : réduire le gaspillage durablement.",
    },
    {
      key: 'proximite',
      title: 'Proximité',
      text: "Être présent sur le terrain : actions locales en France et interventions directes en Côte d'Ivoire.",
      Icon: MapPin,
      note: "Partenariats locaux pour des réponses adaptées et concrètes.",
    },
  ],
  finalNote = "Nos valeurs ne sont pas des mots : ce sont nos critères pour chaque décision",
}) {
  return (
    <section aria-labelledby="vision-title" className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="text-sm font-semibold text-[#D6453A]">{surtitre}</div>
          <h2 id="vision-title" className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">{title}</h2>
          <p className="mt-4 text-gray-700 text-base max-w-3xl">{intro}</p>
        </header>

        {/* Valeurs — grille épurée */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {values.map((v) => {
            const Icon = v.Icon || (() => null);
            return (
              <article
                key={v.key}
                className="group flex flex-col gap-3 p-5 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
                aria-labelledby={`value-${v.key}-title`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow">
                      <Icon aria-hidden="true" size={20} className="text-[#D6453A]" />
                    </div>
                  </div>

                  <div>
                    <h3 id={`value-${v.key}-title`} className="text-lg font-semibold text-gray-900">{v.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{v.text}</p>
                  </div>
                </div>

                {/* Micro-copy UX — pourquoi ça compte */}
                <div className="mt-auto text-xs text-gray-500">{v.note || generateNote(v.key)}</div>
              </article>
            );
          })}
        </div>

        {/* Final note / confiance */}
        <div className="mt-8">
          <p className="text-sm text-gray-600">{finalNote}</p>
        </div>
      </div>
    </section>
  );
}

function generateNote(key) {
  switch (key) {
    case 'solidarite':
      return "Nous favorisons des réponses adaptées et respectueuses envers chaque personne aidée.";
    case 'transparence':
      return "Suivi visible : où va le don, comment il est utilisé, qui en bénéficie.";
    case 'durabilite':
      return "Réduire le gaspillage en donnant une seconde vie et en soutenant l'économie locale.";
    case 'proximite':
      return "Présence locale pour des actions rapides, pertinentes et durables.";
    default:
      return "Valeur essentielle guidant nos actions sur le terrain.";
  }
}

Vision.propTypes = {
  surtitre: PropTypes.string,
  title: PropTypes.string,
  intro: PropTypes.string,
  values: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      Icon: PropTypes.elementType,
      note: PropTypes.string,
    })
  ),
  finalNote: PropTypes.string,
};
