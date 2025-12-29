import React from 'react';
import PropTypes from 'prop-types';

// Histoire.js
// Section "Histoire de l'association Rêve d'Ivoire"
// Simple, claire et prête à intégrer la page À propos

export default function Histoire({
  title = "Histoire de l’association Rêve d’Ivoire",
  lead = "Créée en 2016, Rêve d’Ivoire accompagne les familles et mobilise la communauté autour d’actions solidaires liées à la Côte d’Ivoire et à la diaspora.",
  timeline = [
    {
      year: '2016',
      title: 'La création',
      text: "Créée en 2016, l'association Rêve d'Ivoire voit le jour pour soutenir les familles en difficulté et mener des actions solidaires tournées vers la Côte d'Ivoire et la diaspora. Dès ses débuts, l'équipe s'engage dans la collecte de vêtements, le soutien social de proximité et l'organisation d'événements communautaires.",
    },
    {
      year: '2017',
      title: 'Développement local',
      text: "À partir de 2017, l'association développe ses premières actions locales : aide aux familles, événements culturels afro-caribéens, et premières opérations de collecte et redistribution. Les réseaux sociaux deviennent rapidement un relais important pour mobiliser la communauté.",
    },
    {
      year: '2017 - 2023',
      title: 'Consolidation',
      text: "Entre 2017 et 2023, Rêve d'Ivoire continue d'avancer pas à pas : collectes ponctuelles, accompagnement de personnes en difficulté et soutien à des projets éducatifs et humanitaires en Côte d'Ivoire. La visibilité augmente grâce à des publications, partenariats locaux et initiatives communautaires.",
    },
    {
      year: '2024 - 2025',
      title: 'Nouvelle dynamique',
      text: "En 2024 et 2025, l'association accélère la structuration : communication clarifiée, officialisation des actions et relance de projets pour toucher davantage de bénéficiaires. C'est aussi la période où l'idée de Frip2Rêve — une friperie solidaire — prend forme pour financer les actions futures.",
    },
    {
      year: '2025',
      title: 'Relance et site vitrine',
      text: "En 2025, Rêve d'Ivoire repart sur des bases claires avec la création d'un nouveau site vitrine destiné à mieux présenter missions, valeurs et projets. L'objectif : renforcer la transparence, faciliter les dons et offrir un espace stable pour suivre l'évolution des actions.",
    },
  ],
}) {
  return (
    <section aria-labelledby="histoire-title" className="py-16 px-6 bg-white">
      <div className="max-w-5xl mx-auto">
        <header className="mb-8">
          <h2 id="histoire-title" className="text-2xl sm:text-3xl font-extrabold text-gray-900">{title}</h2>
          <p className="mt-3 text-gray-700 text-base max-w-3xl">{lead}</p>
        </header>

        <ol className="relative border-l border-gray-200 ml-2">
          {timeline.map((item, idx) => (
            <li key={item.year + idx} className="mb-10 ml-6">
              <span className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-[#D6453A] text-white text-xs font-semibold">{item.year}</span>
              <div className="flex flex-col sm:flex-row sm:items-start gap-2">
                <div className="sm:w-1/3">
                  <h3 className="text-sm font-semibold text-gray-900">{item.title}</h3>
                </div>
                <div className="sm:flex-1 text-sm text-gray-700">{item.text}</div>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-6 text-sm text-gray-600">Texte basé sur les informations partagées et nos échanges. Si vous souhaitez ajouter des photos, témoignages ou documents d'archive, je peux intégrer un carrousel ou des liens de téléchargement.</p>
      </div>
    </section>
  );
}

Histoire.propTypes = {
  title: PropTypes.string,
  lead: PropTypes.string,
  timeline: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
};
