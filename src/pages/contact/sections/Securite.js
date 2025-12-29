import React from 'react';
import PropTypes from 'prop-types';
import { ShieldCheck, Lock, FileText } from 'lucide-react';

/**
 * Section — Sécurité & confidentialité (RGPD)
 * - Mobile-first, concise, rassurant
 * - Vouvoyement dans tous les textes
 */

export default function SectionSecuriteConfidentialite({ privacyHref = '/politique-confidentialite' }) {
  return (
    <section className="w-full bg-gray-50 py-12 px-4 sm:px-6 lg:px-12" aria-labelledby="sec-conf-title">
      <div className="max-w-4xl mx-auto">
        <h2 id="sec-conf-title" className="text-2xl font-extrabold text-gray-900">Sécurité & confidentialité</h2>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-6 h-6 text-[#7B2D2D] flex-shrink-0" aria-hidden />
            <div>
              <h3 className="font-semibold">Usage des données</h3>
              <p className="mt-2 text-sm text-gray-700">Les informations transmises via ce formulaire sont utilisées uniquement pour répondre à votre demande. Aucune donnée n’est vendue ou cédée à des tiers à des fins commerciales.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Lock className="w-6 h-6 text-[#7B2D2D] flex-shrink-0" aria-hidden />
            <div>
              <h3 className="font-semibold">Stockage sécurisé</h3>
              <p className="mt-2 text-sm text-gray-700">Les données sont stockées de manière sécurisée et traitées conformément au RGPD. Vous pouvez demander l’accès, la modification ou la suppression de vos données à tout moment.</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <FileText className="w-6 h-6 text-[#7B2D2D] flex-shrink-0" aria-hidden />
            <div>
              <h3 className="font-semibold">Vos droits</h3>
              <p className="mt-2 text-sm text-gray-700">En envoyant ce formulaire, vous acceptez notre politique de confidentialité. <a href={privacyHref} className="underline text-indigo-600" aria-label="Lire la politique de confidentialité">Lire la politique de confidentialité</a></p>
            </div>
          </div>
        </div>

        <p className="mt-6 text-sm text-gray-600">Si vous souhaitez exercer vos droits ou poser une question relative à la protection des données, contactez-nous via <a href="mailto:contact@revedivoire.fr" className="underline">contact@revedivoire.fr</a>.</p>
      </div>
    </section>
  );
}

SectionSecuriteConfidentialite.propTypes = {
  privacyHref: PropTypes.string,
};