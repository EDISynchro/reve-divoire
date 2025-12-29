import React from "react";
import { Heart, Repeat, Users, CheckCircle } from "lucide-react";

/**
 * SectionSupport (GAFAM style)
 * - Minimal, direct, axé conversion
 * - Trois options claires, preuve en bas
 * - Props : onDonate, onMonthly, onPartner
 */

export default function SectionSupportGafam({
  title = "Soutenir Rêve d'Ivoire",
  subtitle = "Des actions transparentes et mesurables — agissez aujourd'hui.",
  onDonate = () => {},
  onMonthly = () => {},
  onPartner = () => {}
}) {
  return (
    <section aria-labelledby="support-title" className="w-full bg-white text-slate-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-14">
        <header className="max-w-3xl mx-auto text-center">
          <h2 id="support-title" className="text-3xl sm:text-4xl font-extrabold tracking-tight">{title}</h2>
          <p className="mt-3 text-base text-slate-600">{subtitle}</p>
        </header>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Don ponctuel */}
          <article className="bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 grid place-items-center rounded-lg bg-rose-600 text-white">
                  <Heart className="w-5 h-5" aria-hidden />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Don ponctuel</h3>
                  <p className="text-xs text-slate-600 mt-1">Soutenez un projet précis ou aidez le fonctionnement général.</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button onClick={onDonate} className="w-full px-4 py-3 rounded-full bg-rose-600 text-white font-semibold">Faire un don</button>
              <p className="mt-2 text-xs text-slate-500">Reçu et traçabilité disponibles sur demande.</p>
            </div>
          </article>

          {/* Don régulier */}
          <article className="bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 grid place-items-center rounded-lg bg-emerald-600 text-white">
                  <Repeat className="w-5 h-5" aria-hidden />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Don régulier</h3>
                  <p className="text-xs text-slate-600 mt-1">Garantissez la continuité des actions avec un soutien mensuel.</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button onClick={onMonthly} className="w-full px-4 py-3 rounded-full border border-emerald-600 text-emerald-600 font-semibold">Soutenir chaque mois</button>
              <p className="mt-2 text-xs text-slate-500">Rapports réguliers sur l'utilisation des fonds.</p>
            </div>
          </article>

          {/* Partenariats */}
          <article className="bg-slate-50 rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 grid place-items-center rounded-lg bg-blue-600 text-white">
                  <Users className="w-5 h-5" aria-hidden />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900">Partenariats & bénévolat</h3>
                  <p className="text-xs text-slate-600 mt-1">Entreprises, associations ou volontaires : rejoignez nos projets locaux.</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <button onClick={onPartner} className="w-full px-4 py-3 rounded-full border border-slate-300 text-slate-800 font-semibold">Nous rejoindre</button>
              <p className="mt-2 text-xs text-slate-500">Actions co-construites, visibilité pour les partenaires.</p>
            </div>
          </article>
        </div>

        <div className="mt-8 max-w-3xl mx-auto bg-slate-50 rounded-2xl p-4 border border-slate-100 flex items-start gap-4">
          <div className="w-10 h-10 grid place-items-center rounded-lg bg-rose-600 text-white">
            <CheckCircle className="w-5 h-5" aria-hidden />
          </div>
          <div>
            <div className="text-sm font-semibold">Suivi transparent</div>
            <p className="text-xs text-slate-600 mt-1">Comptes-rendus, preuves terrain et rapports simples pour chaque projet financé.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
