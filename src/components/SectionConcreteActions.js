import React from "react";
import forimLogo from "../assets/partenaires/forim_logo.webp"; // à adapter si besoin

export default function TrustSection() {
  return (
    <section className="w-full bg-slate-50 border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">

        {/* Titre */}
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Une association reconnue et engagée
        </h2>

        {/* Bloc preuve */}
        <div className="mt-10 flex flex-col items-center gap-6">

          {/* Logo FORIM */}
          <div className="bg-white rounded-xl shadow-sm px-6 py-4">
            <img
              src={forimLogo}
              alt="FORIM – Réseau national des diasporas solidaires"
              className="h-14 w-auto object-contain"
              loading="lazy"
            />
          </div>

          {/* Texte court */}
          <p className="max-w-2xl text-base text-slate-700 leading-relaxed">
            Rêve d’Ivoire a été mise en lumière par le <strong>FORIM</strong>,
            plateforme nationale des diasporas solidaires, pour son engagement
            social et humanitaire en France et en Côte d’Ivoire.
          </p>

          {/* Bouton */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-slate-300 text-slate-800 bg-white text-sm font-medium hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
            aria-label="Voir la reconnaissance officielle"
          >
            Voir la reconnaissance officielle
          </a>
        </div>
      </div>
    </section>
  );
}
