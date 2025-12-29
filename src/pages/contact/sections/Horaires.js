import React from 'react';
import PropTypes from 'prop-types';
import { Clock, Instagram, Video } from 'lucide-react';

/**
 * Section — Heures d’ouverture & réseaux sociaux
 * - Mobile-first, accessible, full-width
 * - Vouvoyement dans tous les textes
 */

export default function SectionHorairesReseaux({
  instagram = 'https://www.instagram.com/revedivoire',
  tiktok = 'https://www.tiktok.com/@revedivoire',
}) {
  return (
    <section className="w-full bg-white py-12 px-4 sm:px-6 lg:px-12" aria-labelledby="horaires-reseaux-title">
      <div className="max-w-7xl mx-auto">
        <header className="max-w-3xl mb-6">
          <h2 id="horaires-reseaux-title" className="text-2xl font-extrabold text-gray-900">Horaires & réseaux sociaux</h2>
          <p className="mt-2 text-gray-700">Dites quand nous joindre et où suivre nos actions.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Heures d'ouverture */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Clock className="w-6 h-6 text-[#7B2D2D]" aria-hidden />
              <div>
                <h3 className="text-lg font-semibold">Heures d’ouverture</h3>
                <div className="mt-3 text-base text-gray-800">
                  <div>Lundi – Vendredi : 9h – 18h</div>
                  <div>Samedi : sur rendez‑vous</div>
                  <div>Dimanche : fermé</div>
                </div>
                <p className="mt-3 text-sm text-gray-500">Réponse sous 24 à 48h ouvrées.</p>
              </div>
            </div>
          </div>

          {/* Réseaux sociaux */}
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-start gap-3">
              <Instagram className="w-6 h-6 text-[#7B2D2D]" aria-hidden />
              <div>
                <h3 className="text-lg font-semibold">Suis Rêve d’Ivoire</h3>
                <p className="mt-3 text-gray-700">Suivez-nous pour nos actualités, actions et événements.</p>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <a href={instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-4 py-3 rounded-md bg-white border text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#7B2D2D]" aria-label="Ouvrir Instagram de Rêve d'Ivoire">
                    <Instagram className="w-5 h-5" />
                    <span>@revedivoire</span>
                  </a>

                  <a href={tiktok} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 px-4 py-3 rounded-md bg-white border text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-[#7B2D2D]" aria-label="Ouvrir TikTok de Rêve d'Ivoire">
                    <Video className="w-5 h-5" />
                    <span>@revedivoire</span>
                  </a>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

SectionHorairesReseaux.propTypes = {
  instagram: PropTypes.string,
  tiktok: PropTypes.string,
};