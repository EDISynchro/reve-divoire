import React from "react";
import { Recycle, TrendingUp } from "lucide-react";

export default function Frip2ReveSection() {
  return (
    <section className="w-full bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">

        {/* Titre & intro */}
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Frip2Rêve : une boutique solidaire au service de nos actions
          </h2>
          <p className="mt-4 text-base text-slate-700">
            Pour financer ses actions et rester indépendante, Rêve d’Ivoire a
            créé <strong>Frip2Rêve</strong>, une boutique solidaire inspirée du
            modèle d’Emmaüs.
          </p>
        </div>

        {/* Contenu */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* À quoi ça sert */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Recycle className="w-5 h-5 text-emerald-600" aria-hidden />
              <h3 className="text-xl font-semibold text-slate-900">
                À quoi sert Frip2Rêve ?
              </h3>
            </div>

            <ul className="space-y-3 text-sm text-slate-700">
              <li>• Transformer les dons en ressources utiles</li>
              <li>• Financer les actions sociales et humanitaires</li>
              <li>• Favoriser l’économie circulaire et solidaire</li>
            </ul>
          </div>

          {/* Impact concret */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <TrendingUp className="w-5 h-5 text-rose-600" aria-hidden />
              <h3 className="text-xl font-semibold text-slate-900">
                Ce que ça change concrètement
              </h3>
            </div>

            <ul className="space-y-3 text-sm text-slate-700">
              <li>• Moins de dépendance aux subventions</li>
              <li>• Plus de stabilité pour les projets</li>
              <li>• Impact durable sur le terrain</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-14 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="#"
            className="inline-flex items-center justify-center px-7 py-3 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-300"
            aria-label="Découvrir Frip2Rêve"
          >
            Découvrir Frip2Rêve
          </a>

          <a
            href="#"
            className="inline-flex items-center justify-center px-7 py-3 rounded-full border border-slate-300 bg-white text-slate-800 text-sm font-medium hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
            aria-label="Donner ou acheter solidaire"
          >
            Donner ou acheter solidaire
          </a>
        </div>
      </div>
    </section>
  );
}
