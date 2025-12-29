import React from 'react';
import PropTypes from 'prop-types';
import { Clock, Users, Package } from 'lucide-react';

// ImpactShort.js
// Section "Impact — version courte" — conçue comme un brief UI/UX pour le designer.
// Objectif : preuve rapide et crédible (statistiques clés lisibles en 4–6 secondes).

export default function ImpactShort({
  items = [
    {
      key: 'since',
      number: '2016',
      label: 'Année de création',
      sub: '8 ans d\'actions solidaires',
      micro: 'Une aide qui dure dans le temps.',
      Icon: Clock,
    },
    {
      key: 'families',
      number: '120+',
      label: 'Familles accompagnées',
      sub: 'En France et en Côte d\'Ivoire',
      micro: 'Un impact humain réel.',
      Icon: Users,
    },
    {
      key: 'weight',
      number: '1,5t',
      label: 'Vêtements redistribués',
      sub: 'Collectés, triés, transmis',
      micro: 'Rien ne reste dans un carton.',
      Icon: Package,
    },
  ],
  className = '',
}) {
  return (
    <section aria-labelledby="impact-short-title" className={`py-12 px-4 bg-white ${className}`}>
      <div className="max-w-6xl mx-auto">
        <header className="mb-6">
          <h2 id="impact-short-title" className="text-lg font-extrabold text-gray-900">Impact</h2>
          <p className="mt-1 text-sm text-gray-600">Chiffres clés — lisibles en 4 secondes.</p>
        </header>

        {/* 3 cartes alignées */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {items.map((it) => {
            const Icon = it.Icon || (() => null);
            return (
              <article
                key={it.key}
                className="flex flex-col items-start gap-3 p-6 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm"
                aria-labelledby={`impact-${it.key}-title`}
              >
                <div className="flex items-center gap-3 w-full">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow">
                    <Icon size={20} aria-hidden="true" className="text-[#D6453A]" />
                  </div>

                  <div className="ml-2">
                    <div className="text-3xl sm:text-4xl font-extrabold leading-none text-gray-900">{it.number}</div>
                    <div id={`impact-${it.key}-title`} className="text-xs font-semibold text-gray-600 mt-1">{it.label}</div>
                  </div>
                </div>

                <div className="mt-2 text-sm text-gray-700">{it.sub}</div>
                <div className="mt-auto text-xs text-gray-500 italic">{it.micro}</div>
              </article>
            );
          })}
        </div>

        </div>
    </section>
  );
}

ImpactShort.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      label: PropTypes.string,
      sub: PropTypes.string,
      micro: PropTypes.string,
      Icon: PropTypes.elementType,
    })
  ),
  className: PropTypes.string,
};
