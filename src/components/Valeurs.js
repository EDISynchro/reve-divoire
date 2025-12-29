import React from 'react';
import PropTypes from 'prop-types';
import { HeartHandshake, Shirt, MapPin } from 'lucide-react';

/**
 * ValeursThreePoints — UI/UX refonte
 * - Icônes lucide-react cohérentes
 * - Cartes lisibles, contrastées, hover doux
 * - Mobile-first, accessible, clean
 */

export default function ValeursThreePoints({
  title = 'Nos valeurs en 3 points',
  intro = "Ce qui guide chaque projet de l'association.",
  items = [
    {
      key: 'solidarite',
      title: 'Solidarité',
      text: 'Une association engagée pour soutenir les familles les plus vulnérables.',
      icon: HeartHandshake,
    },
    {
      key: 'friperie',
      title: 'Friperie solidaire (Frip2Rêve)',
      text: 'Les vêtements collectés financent nos actions sociales et nos missions terrain.',
      icon: Shirt,
    },
    {
      key: 'actions',
      title: 'Actions en Côte d’Ivoire',
      text: 'Livraison directe, soutien matériel et accompagnement des enfants et familles.',
      icon: MapPin,
    },
  ],
}) {
  return (
    <section
      aria-labelledby="valeurs-title"
      className="relative py-16 px-6 bg-gradient-to-b from-white to-gray-50"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <h2
            id="valeurs-title"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900"
          >
            {title}
          </h2>
          {intro && (
            <p className="mt-3 text-sm sm:text-base text-gray-600">
              {intro}
            </p>
          )}
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <article
                key={it.key}
                className="group relative flex flex-col items-center text-center p-8 rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Icon bubble */}
                <div className="mb-5 flex items-center justify-center w-14 h-14 rounded-full bg-[#D6453A]/10 text-[#D6453A] transition-transform duration-300 group-hover:scale-110">
                  <Icon size={26} aria-hidden="true" />
                </div>

                <h3 className="text-lg font-semibold text-gray-900">
                  {it.title}
                </h3>

                <p className="mt-3 text-sm text-gray-700 leading-relaxed">
                  {it.text}
                </p>

                {/* subtle accent */}
                <span
                  aria-hidden="true"
                  className="absolute inset-x-8 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-[#D6453A] to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

ValeursThreePoints.propTypes = {
  title: PropTypes.string,
  intro: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      icon: PropTypes.elementType.isRequired,
    })
  ),
};