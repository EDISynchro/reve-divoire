// src/components/MissionSectionCompact.jsx
import React from "react";
import { Repeat, ShoppingBag, BookOpen } from "lucide-react";

export default function MissionSectionCompact() {
  return (
    <section
      id="mission"
      aria-labelledby="mission-title"
      className="bg-gray-50 p-10  sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Heading / intro */}
        <header className="text-center max-w-3xl mx-auto">
          <h2 id="mission-title" className="text-2xl sm:text-3xl font-bold text-gray-900">
            Notre mission
          </h2>
          <p className="mt-2 text-base text-gray-700">
            Alléger la précarité matérielle et soutenir l’éducation par la collecte solidaire, la boutique Frip2Rêve et des projets co-construits avec les communautés.
          </p>
        </header>

        {/* Bloc intro */}
        <div className="mt-4 max-w-4xl mx-auto text-gray-600 text-center text-sm sm:text-base">
          <p>
            Rêve d’Ivoire aide les familles en France et en Côte d’Ivoire en transformant des dons en ressources durables : vêtements réemployés, kits scolaires, équipements et actions pédagogiques. Nous privilégions l’action co-construite, la transparence des moyens et le suivi mesurable des résultats.
          </p>
        </div>

        {/* Piliers */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Card 1 */}
          <article className="bg-white rounded-lg shadow hover:shadow-md transition p-4 flex flex-col items-start">
            <div className="bg-yellow-50 rounded-full p-2">
              <Repeat className="h-5 w-5 text-yellow-600" aria-hidden="true" />
            </div>
            <h3 className="mt-2 text-base font-semibold text-gray-900">Collecte & tri</h3>
            <p className="mt-1 text-gray-600 text-xs">
              Nous réceptionnons, trions et remettons en état les dons pour garantir qualité et dignité.
            </p>
            <p className="mt-1 text-gray-500 text-xxs">Preuve : procédures de tri, photos avant/après, taux de réemploi.</p>
          </article>

          {/* Card 2 */}
          <article className="bg-white rounded-lg shadow hover:shadow-md transition p-4 flex flex-col items-start">
            <div className="bg-yellow-50 rounded-full p-2">
              <ShoppingBag className="h-5 w-5 text-yellow-600" aria-hidden="true" />
            </div>
            <h3 className="mt-2 text-base font-semibold text-gray-900">Frip2Rêve — Boutique solidaire</h3>
            <p className="mt-1 text-gray-600 text-xs">
              La boutique finance nos actions locales : chaque vêtement remis en vente soutient directement un projet éducatif.
            </p>
            <p className="mt-1 text-gray-500 text-xxs">Preuve : part du chiffre reversée (ex. 70% des recettes), calendrier des ventes.</p>
          </article>

          {/* Card 3 */}
          <article className="bg-white rounded-lg shadow hover:shadow-md transition p-4 flex flex-col items-start">
            <div className="bg-yellow-50 rounded-full p-2">
              <BookOpen className="h-5 w-5 text-yellow-600" aria-hidden="true" />
            </div>
            <h3 className="mt-2 text-base font-semibold text-gray-900">Projets éducatifs</h3>
            <p className="mt-1 text-gray-600 text-xs">
              Kits scolaires, bibliothèques et interventions pédagogiques menées avec les écoles et les familles locales.
            </p>
            <p className="mt-1 text-gray-500 text-xxs">Preuve : chiffres clés par projet, témoignages, photos d’établissements.</p>
          </article>
        </div>

        {/* Micro-confiance */}
        <div className="mt-6 border-t border-gray-200 py-3 px-4 text-center text-sm sm:text-xs rounded-lg shadow-sm">
          <p className="text-gray-600">
            Transparence • Suivi terrain • Respect de la dignité
            <span className="mx-1">•</span>
            <a href="#projets" className="text-yellow-600 font-medium hover:underline" aria-label="Voir nos preuves">
              Voir nos preuves
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
