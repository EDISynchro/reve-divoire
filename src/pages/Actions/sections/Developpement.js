import React from 'react';
import PropTypes from 'prop-types';

// Carte roadmap réutilisable
function RoadmapCard({ title, detail, microCopy, imageSrc, imageAlt, ctaLabel, onClick }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border-l-4 border-[#D6A43A] overflow-hidden flex flex-col">
      <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <span className="text-gray-400">Image projet en développement</span>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-xs font-semibold text-[#D6A43A] mb-1 flex items-center gap-1">
            🚧 En développement
          </div>
          <h3 className="text-lg font-bold mb-2">{title}</h3>
          {detail && <p className="text-gray-700 text-sm mb-1">{detail}</p>}
          {microCopy && <p className="text-gray-500 text-xs">{microCopy}</p>}
        </div>
        {ctaLabel && (
          <button
            onClick={onClick}
            className="mt-3 px-4 py-2 text-sm font-semibold text-white bg-[#D6A43A] rounded hover:opacity-90 transition"
          >
            {ctaLabel}
          </button>
        )}
      </div>
    </div>
  );
}

RoadmapCard.propTypes = {
  title: PropTypes.string.isRequired,
  detail: PropTypes.string,
  microCopy: PropTypes.string,
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  ctaLabel: PropTypes.string,
  onClick: PropTypes.func,
};

// Section Roadmap
export default function SectionRoadmap() {
  const roadmapItems = [
    {
      title: 'Structuration des relais en Côte d’Ivoire',
      detail: 'Mise en place de contrats et charte pour chaque relais local.',
      microCopy: 'En chantier — on avance avec vous.',
      imageSrc: null, // remplacer par schéma ou photo équipe
      imageAlt: 'Réunion relais Côte d’Ivoire',
      ctaLabel: 'Voir détails',
      onClick: () => alert('Ouvre modal ou page détail'),
    },
    {
      title: 'Plateforme de suivi',
      detail: 'Tableau de bord simple : envoi → réceptions → bénéficiaires.',
      microCopy: 'En chantier — on avance avec vous.',
      imageSrc: null, // remplacer par mockup dashboard
      imageAlt: 'Mockup tableau de suivi',
      ctaLabel: 'Voir détails',
      onClick: () => alert('Ouvre modal ou page détail'),
    },
    {
      title: 'Calendrier Frip2Rêve',
      detail: 'Ventes régulières + live-ventes mensuelles.',
      microCopy: 'En chantier — on avance avec vous.',
      imageSrc: null, // remplacer par photo stand / calendrier
      imageAlt: 'Calendrier événement Frip2Rêve',
      ctaLabel: 'Voir détails',
      onClick: () => alert('Ouvre modal ou page détail'),
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-center mb-8">Projets en développement</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmapItems.map((item, idx) => (
            <RoadmapCard key={idx} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
