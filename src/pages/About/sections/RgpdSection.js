import React from "react";
import { ShieldCheck, UserCheck, Lock, ClipboardCheck, ArrowRight } from "lucide-react";

export default function RGPDSection() {
  return (
    <section
      id="rgpd"
      aria-labelledby="rgpd-title"
      className="w-full bg-gray-50 py-16 px-4 sm:px-6 lg:px-12"
      role="region"
    >
      <div className="max-w-7xl mx-auto flex flex-col space-y-12">

        {/* Header compact */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-[#FDE8E8] flex-shrink-0">
              <ShieldCheck className="w-10 h-10 text-[#7B2D2D]" aria-hidden="true" />
            </div>
            <div>
              <h2 id="rgpd-title" className="text-xl md:text-2xl font-bold text-gray-900">
                Transparence et respect de vos données
              </h2>
              <p className="mt-1 text-sm md:text-base text-gray-600 max-w-md">
                Rêve d’Ivoire agit avec clarté et responsabilité et collecte uniquement les informations nécessaires.
              </p>
            </div>
          </div>

          <a
            href="/politique-de-confidentialite"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 bg-[#7B2D2D] text-white font-semibold py-2 px-5 rounded-lg shadow hover:shadow-md transition text-sm md:text-base"
          >
            Politique de confidentialité
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        {/* Contenu détaillé full-width */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

          {/* Card 1 */}
          <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition transform hover:-translate-y-1 duration-300 flex flex-col items-center text-center">
            <UserCheck className="w-10 h-10 text-[#7B2D2D] mb-3" />
            <h3 className="text-[#7B2D2D] font-semibold mb-2">Utilisation des données</h3>
            <p className="text-gray-700 text-sm md:text-base">
              Vos informations servent uniquement à la gestion des dons, bénévoles et projets. 
              Tout est clair et transparent pour vous.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition transform hover:-translate-y-1 duration-300 flex flex-col items-center text-center">
            <ClipboardCheck className="w-10 h-10 text-[#7B2D2D] mb-3" />
            <h3 className="text-[#7B2D2D] font-semibold mb-2">Droits des utilisateurs</h3>
            <p className="text-gray-700 text-sm md:text-base">
              Vous pouvez accéder, modifier ou supprimer vos données à tout moment selon la loi, facilement.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition transform hover:-translate-y-1 duration-300 flex flex-col items-center text-center">
            <Lock className="w-10 h-10 text-[#7B2D2D] mb-3" />
            <h3 className="text-[#7B2D2D] font-semibold mb-2">Sécurité & confiance</h3>
            <p className="text-gray-700 text-sm md:text-base">
              Vos données sont protégées, jamais revendues, et conservées uniquement le temps nécessaire.
              Votre confiance est notre priorité.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
