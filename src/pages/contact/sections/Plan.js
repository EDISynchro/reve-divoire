import React from 'react';
import PropTypes from 'prop-types';
import { MapPin, ExternalLink } from 'lucide-react';

/**
 * SectionPlanAcces.js
 * Section — Plan d’accès / Carte
 * - Mobile-first, full-width map embed (Google Maps)
 * - Vouvoyement dans tous les textes
 *
 * Props:
 *  - name, addressLine1, addressLine2, mapQuery
 */

export default function SectionPlanAcces({
  name = 'Rêve d’Ivoire',
  addressLine1 = '35 Avenue Hector Berlioz',
  addressLine2 = '95820 Bruyères-sur-Oise, France',
  mapQuery = '35 Avenue Hector Berlioz 95820 Bruy%C3%A8res-sur-Oise France',
}) {
  const mapsSearch = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`;
  const mapsDirections = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapQuery)}`;
  const embedSrc = `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`;

  return (
    <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-12" aria-labelledby="plan-title">
      <div className="max-w-7xl mx-auto">
        <header className="max-w-3xl mb-6">
          <h2 id="plan-title" className="text-2xl font-extrabold text-gray-900">Nous trouver</h2>
          <p className="mt-2 text-gray-700">Cliquez sur la carte pour ouvrir l’itinéraire.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Address block */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <MapPin className="w-6 h-6 text-[#7B2D2D]" aria-hidden />
              <div>
                <div className="text-sm text-gray-600">{name}</div>
                <address className="not-italic mt-2 text-base text-gray-800">
                  <div>{addressLine1}</div>
                  <div>{addressLine2}</div>
                </address>

                <div className="mt-4 flex flex-col gap-2">
                  <a href={mapsDirections} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#7B2D2D] text-white" aria-label="Ouvrir l'itinéraire vers Rêve d'Ivoire"> <ExternalLink className="w-4 h-4" /> Itinéraire Google Maps</a>
                  <a href={mapsSearch} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white border text-gray-900" aria-label="Ouvrir l'adresse dans Google Maps">Voir l'adresse sur Google Maps</a>
                </div>
              </div>
            </div>

            <p className="mt-4 text-sm text-gray-500">Horaires : Lundi–Vendredi 9h–18h. Cliquez sur la carte pour ouvrir l’itinéraire.</p>
          </div>

          {/* Map full width on desktop by spanning columns */}
          <div className="lg:col-span-2">
            <div className="w-full rounded-lg overflow-hidden shadow-sm">
              <a href={mapsDirections} target="_blank" rel="noopener noreferrer" aria-label="Ouvrir l'itinéraire vers Rêve d'Ivoire" className="block">
                <div className="w-full aspect-video bg-gray-100">
                  <iframe
                    title={`Carte — ${name}`}
                    src={embedSrc}
                    width="100%"
                    height="100%"
                    loading="lazy"
                    style={{ border: 0 }}
                    aria-hidden="false"
                  />
                </div>
              </a>

              {/* Fallback link visible if JS disabled or iframe blocked */}
              <div className="p-4 bg-white">
                <p className="text-sm text-gray-700">Si la carte ne s’affiche pas, <a href={mapsSearch} target="_blank" rel="noopener noreferrer" className="underline">ouvrez l’itinéraire sur Google Maps</a>.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

SectionPlanAcces.propTypes = {
  name: PropTypes.string,
  addressLine1: PropTypes.string,
  addressLine2: PropTypes.string,
  mapQuery: PropTypes.string,
};
