import React from "react";
import { MapPin, HeartHandshake } from "lucide-react";

export default function ActionsSection() {
  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">

        {/* Titre */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Nos actions sur le terrain
          </h2>
          <p className="mt-4 text-base text-slate-700">
            En France et en Côte d’Ivoire, Rêve d’Ivoire agit chaque jour pour
            soutenir les personnes en situation de précarité et redonner de la
            dignité aux populations.
          </p>
        </div>

        {/* Contenu */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* France */}
          <div className="rounded-2xl border border-slate-200 p-8 bg-slate-50">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="w-5 h-5 text-rose-600" aria-hidden />
              <h3 className="text-xl font-semibold text-slate-900">
                Actions en France
              </h3>
            </div>

            <ul className="space-y-3 text-sm text-slate-700">
              <li>• Maraudes solidaires auprès des personnes en difficulté</li>
              <li>• Collectes et distributions de vêtements et fournitures</li>
              <li>• Sensibilisation et mobilisation de la diaspora</li>
              <li>• Boutique solidaire <strong>Frip2Rêve</strong></li>
            </ul>
          </div>

          {/* Côte d’Ivoire */}
          <div className="rounded-2xl border border-slate-200 p-8 bg-slate-50">
            <div className="flex items-center gap-3 mb-6">
              <HeartHandshake className="w-5 h-5 text-emerald-600" aria-hidden />
              <h3 className="text-xl font-semibold text-slate-900">
                Actions en Côte d’Ivoire
              </h3>
            </div>

            <ul className="space-y-3 text-sm text-slate-700">
              <li>• Soutien direct aux familles et aux enfants</li>
              <li>• Collectes et distributions locales</li>
              <li>• Projets de formation et d’autonomie</li>
              <li>• Actions éducatives et sociales durables</li>
            </ul>
          </div>
        </div>

        {/* Bouton */}
        <div className="mt-14 text-center">
          <button
            className="inline-flex items-center justify-center px-8 py-3 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"
            aria-label="Voir toutes nos actions"
          >
            Voir toutes nos actions
          </button>
        </div>
      </div>
    </section>
  );
}
