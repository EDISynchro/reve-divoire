import React from 'react';
import PropTypes from 'prop-types';

// Carte projet réutilisable
function ProjectCard({ title, objective, process, impact, imageSrc, imageAlt, ctaLabel, onClick }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden flex flex-col">
      <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <span className="text-gray-400">Image projet (à remplacer)</span>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-xs font-semibold text-[#D6453A] mb-1">Projet permanent</div>
          <h3 className="text-lg font-bold mb-2">{title}</h3>
          {objective && <p className="text-gray-700 text-sm mb-1"><strong>Objectif:</strong> {objective}</p>}
          {process && <p className="text-gray-600 text-sm mb-1"><strong>Processus:</strong> {process}</p>}
          {impact && <p className="text-gray-600 text-sm mb-1"><strong>Impact / Garantie:</strong> {impact}</p>}
        </div>
        <button
          onClick={onClick}
          className="mt-3 px-4 py-2 text-sm font-semibold text-white bg-[#D6453A] rounded hover:opacity-90 transition"
        >
          {ctaLabel}
        </button>
      </div>
    </div>
  );
}

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  objective: PropTypes.string,
  process: PropTypes.string,
  impact: PropTypes.string,
  imageSrc: PropTypes.string,
  imageAlt: PropTypes.string,
  ctaLabel: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

// Section Projets Permanents
export default function SectionProjectsPermanent() {
  const projects = [
    {
      title: 'Points de collecte & tri',
      objective: 'Récolter vêtements en bon état et identifier pièces à revaloriser.',
      process: 'Dépôt → Tri → Réparation légère → Stockage pour vente/envoi',
      impact: 'Réduction du gaspillage + approvisionnement pour Frip2Rêve',
      imageSrc: null, // remplacer par photo tri en atelier
      imageAlt: 'Tri des vêtements en atelier',
      ctaLabel: 'Signalez un point de collecte',
      onClick: () => alert('Ouvre modal ou redirection page détail'),
    },
    {
      title: 'Frip2Rêve — boutique solidaire',
      objective: 'Générer des fonds durables pour financer les actions',
      process: 'Ventes en ligne + pop-up stores mensuels. Pièces triées et réparées.',
      impact: '% du chiffre reversé indiqué + preuve d’affectation',
      imageSrc: null, // remplacer par photo boutique
      imageAlt: 'Vêtements exposés en boutique',
      ctaLabel: 'Voir la boutique / Nous proposer des pièces',
      onClick: () => alert('Ouvre modal ou redirection page boutique'),
    },
    {
      title: 'Envois & distribution en Côte d’Ivoire',
      objective: 'Assurer que les dons arrivent bien aux familles identifiées',
      process: 'Constitution liste → Expédition → Confirmation relais → Photos distribution',
      impact: 'Chaque envoi est archivé pour transparence',
      imageSrc: null, // remplacer par photo distribution
      imageAlt: 'Distribution sur le terrain',
      ctaLabel: 'Voir rapport d’envoi',
      onClick: () => alert('Ouvre modal rapport'),
    },
    {
      title: 'Accompagnement social ponctuel',
      objective: 'Aller au-delà du matériel : orientation, aide ponctuelle',
      process: 'Tri besoins → Orientation vers partenaires → Soutien matériel immédiat',
      impact: '',
      imageSrc: null, // remplacer par photo action sociale
      imageAlt: 'Accompagnement social',
      ctaLabel: 'Besoin d’aide ? Contactez-nous',
      onClick: () => alert('Redirection page contact'),
    },
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-center mb-8">Projets permanents</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, idx) => (
            <ProjectCard key={idx} {...project} />
          ))}
        </div>
      </div>
    </section>
  );
}
