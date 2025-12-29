import React from 'react';
import PropTypes from 'prop-types';
import { CheckCircle, FileText, Award } from 'lucide-react';

// Transparence.js
// Section "Transparence & preuves" — UI/UX : bloc clair, rassurant et facile à scanner.

export default function Transparence({
  year = '2016',
  title = 'Transparence & preuves',
  lead = "Rien n'est caché, tout est accessible.",
  adminContact = 'contact@revedivoire.fr',
  docsNote = "Statuts, récépissés préfectoraux, bilans simplifiés et rapports d'actions.",
  className = '',
}) {
  return (
    <section aria-labelledby="transparence-title" className={`py-12 px-4 bg-white ${className}`}>
      <div className="max-w-6xl mx-auto">
        <div className="p-6 rounded-2xl border border-gray-100 bg-gray-50 shadow-sm flex flex-col sm:flex-row items-stretch gap-4">

          {/* Preuve visuelle — grande année */}
          <div className="flex-shrink-0 flex items-center justify-center w-full sm:w-40">
            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-extrabold text-gray-900">{year}</div>
              <div className="text-xs text-gray-500 mt-1">Année de création</div>
            </div>
          </div>

          {/* Contenu principal — institutionnel doux */}
          <div className="flex-1 flex flex-col justify-between gap-3">
            <div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-md bg-white flex items-center justify-center shadow">
                  <CheckCircle size={18} aria-hidden="true" className="text-[#D6453A]" />
                </div>
                <div>
                  <h3 id="transparence-title" className="text-lg font-semibold text-gray-900">{title}</h3>
                  <p className="text-sm text-gray-600">{lead}</p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-md bg-white flex items-center justify-center shadow">
                    <Award size={16} aria-hidden="true" className="text-[#D6453A]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Association déclarée</div>
                    <div className="text-xs text-gray-600">Dossiers administratifs disponibles sur simple demande.</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-md bg-white flex items-center justify-center shadow">
                    <FileText size={16} aria-hidden="true" className="text-[#D6453A]" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">Documents conservés et organisés</div>
                    <div className="text-xs text-gray-600">{docsNote}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3">
              <div className="text-sm text-gray-700">Contact dédié pour toute demande administrative</div>
              <a href={`mailto:${adminContact}`} className="mt-1 inline-block text-sm font-semibold text-[#D6453A] hover:underline">{adminContact}</a>
              <div className="mt-2 text-xs text-gray-500">Nous vous répondons rapidement et clairement.</div>
            </div>
          </div>
        </div>

           </div>
    </section>
  );
}

Transparence.propTypes = {
  year: PropTypes.string,
  title: PropTypes.string,
  lead: PropTypes.string,
  adminContact: PropTypes.string,
  docsNote: PropTypes.string,
  className: PropTypes.string,
};
