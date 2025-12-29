import React from 'react';
import PropTypes from 'prop-types';
import { ShieldCheck, CreditCard, FileText, Eye, CheckCircle2 } from 'lucide-react';

/**
 * Section — Sécurité & transparence
 * - Mobile-first, full-width
 * - Vouvoyement partout
 */

export default function SectionSecuriteTransparence({ donateHref = '/don#form', privacyHref = '/politique-confidentialite' }) {
  return (
    <section className="w-full bg-white py-16 px-4 sm:px-6 lg:px-12" aria-labelledby="securite-title">
      <div className="max-w-7xl mx-auto">
        <header className="max-w-3xl mb-8">
          <h2 id="securite-title" className="text-2xl sm:text-3xl font-extrabold text-gray-900">Sécurité et transparence</h2>
          <p className="mt-3 text-gray-700 text-base">Chez Frip2Rêve, chaque don et chaque engagement bénévole sont gérés avec sérieux. Voici comment nous protégeons vos données et garantissons l’usage correct de votre soutien.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Bloc 1 — Données personnelles */}
          <div className="rounded-lg border p-5 bg-gray-50">
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-[#7B2D2D] flex-shrink-0" aria-hidden />
              <div>
                <h3 className="font-semibold">Données personnelles</h3>
                <p className="mt-2 text-sm text-gray-700">Conformité RGPD — vos informations sont sécurisées et utilisées uniquement pour le traitement de votre don ou de votre proposition de bénévolat.</p>
                <p className="mt-2 text-sm text-gray-600">Vous pouvez demander la suppression de vos données à tout moment.</p>
                <a href={privacyHref} className="mt-3 inline-block text-sm text-indigo-600 underline">Voir la politique de confidentialité</a>
              </div>
            </div>
          </div>

          {/* Bloc 2 — Paiement sécurisé */}
          <div className="rounded-lg border p-5 bg-gray-50">
            <div className="flex items-start gap-3">
              <CreditCard className="w-6 h-6 text-[#7B2D2D] flex-shrink-0" aria-hidden />
              <div>
                <h3 className="font-semibold">Paiement sécurisé</h3>
                <p className="mt-2 text-sm text-gray-700">Carte bancaire via Stripe — sécurisé et conforme PCI DSS.</p>
                <p className="mt-2 text-sm text-gray-700">Virement et chèque — instructions claires et suivi manuel. Don en nature — modalités validées par Frip2Rêve.</p>
                <p className="mt-2 text-sm text-gray-600">Aucun don n’est prélevé avant confirmation.</p>
              </div>
            </div>
          </div>

          {/* Bloc 3 — Utilisation des fonds */}
          <div className="rounded-lg border p-5 bg-gray-50">
            <div className="flex items-start gap-3">
              <FileText className="w-6 h-6 text-[#7B2D2D] flex-shrink-0" aria-hidden />
              <div>
                <h3 className="font-semibold">Utilisation transparente des fonds</h3>
                <p className="mt-2 text-sm text-gray-700">Chaque don est affecté directement aux actions solidaires. Des rapports simplifiés sont disponibles sur demande pour les donateurs.</p>
                <p className="mt-2 text-sm text-gray-700">Un reçu fiscal vous sera fourni si votre don le permet.</p>
                <p className="mt-2 text-sm text-gray-600">Vous savez exactement où va votre aide.</p>
              </div>
            </div>
          </div>

          {/* Bloc 4 — Rassurance visuelle */}
          <div className="rounded-lg border p-5 bg-gray-50">
            <div className="flex items-start gap-3">
              <Eye className="w-6 h-6 text-[#7B2D2D] flex-shrink-0" aria-hidden />
              <div>
                <h3 className="font-semibold">Rassurances</h3>
                <ul className="mt-2 text-sm text-gray-700 space-y-2">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" aria-hidden /> Paiement sécurisé</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" aria-hidden /> Don transparent</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" aria-hidden /> RGPD respecté</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" aria-hidden /> Reçu fiscal possible</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <a href={donateHref} className="inline-block px-6 py-3 bg-[#7B2D2D] text-white rounded-md font-semibold" aria-label="Retour au formulaire de don">Je fais un don maintenant</a>
        </div>
      </div>
    </section>
  );
}

SectionSecuriteTransparence.propTypes = {
  donateHref: PropTypes.string,
  privacyHref: PropTypes.string,
};
