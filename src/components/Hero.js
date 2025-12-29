import React from "react";
import { HandHeart, ShieldCheck } from "lucide-react";
import heroImage from "../assets/association_1.png";

/**
 * HERO — Accueil | Rêve d’Ivoire
 * Objectif :
 * - Compréhensible en 5 secondes
 * - Clair, humain, crédible
 * - Le hero donne envie, le reste du site explique
 */

export default function HeroGafam({
  title = "Rêve d’Ivoire",
  tagline = "Agir durablement pour la dignité et l’avenir des enfants",
  subtitle = "Association franco-ivoirienne engagée depuis 2016, reconnue pour ses actions sociales et solidaires en France et en Côte d’Ivoire.",
  trustBadge = "Mise en lumière par le FORIM — Réseau national des diasporas solidaires",
  primaryCta = "Soutenir l’association",
  secondaryCta = "Découvrir nos actions",
  imageSrc = heroImage,
  imageAlt = "Actions solidaires menées par Rêve d’Ivoire",
  onPrimary = () => {},
  onSecondary = () => {},
}) {
  return (
    <header role="banner" className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* LEFT — Message principal */}
          <div>
            {/* Badge de confiance */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 text-slate-700 text-sm font-medium mb-6">
              <ShieldCheck className="w-4 h-4 text-emerald-600" aria-hidden />
              {trustBadge}
            </div>

            {/* H1 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-slate-900">
              {title}
            </h1>

            {/* Accroche */}
            <p className="mt-4 text-xl text-slate-800 max-w-2xl font-medium">
              {tagline}
            </p>

            {/* Sous-titre */}
            <p className="mt-6 text-base text-slate-600 max-w-2xl">
              {subtitle}
            </p>

            {/* CTA */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button
                onClick={onPrimary}
                className="inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-rose-600 text-white text-sm font-semibold shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-300"
                aria-label={primaryCta}
              >
                <HandHeart className="w-4 h-4" aria-hidden />
                {primaryCta}
              </button>

              <button
                onClick={onSecondary}
                className="inline-flex items-center justify-center px-7 py-3 rounded-full border border-slate-300 text-slate-800 bg-white text-sm font-medium hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
                aria-label={secondaryCta}
              >
                {secondaryCta}
              </button>
            </div>
          </div>

          {/* RIGHT — Image */}
          <figure className="w-full rounded-2xl overflow-hidden bg-slate-100 shadow-lg">
            <img
              src={imageSrc}
              alt={imageAlt}
              loading="lazy"
              className="w-full h-64 sm:h-80 lg:h-96 object-cover"
            />
            <figcaption className="sr-only">{imageAlt}</figcaption>
          </figure>
        </div>
      </div>
    </header>
  );
}
