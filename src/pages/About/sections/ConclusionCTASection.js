import React, { useState, useEffect } from "react";
import { ArrowRight, Heart, Users, BookOpen } from "lucide-react";

export default function ConclusionCTASection() {
  const [showThanks, setShowThanks] = useState(false);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setShowThanks(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleDonateClick = (e) => {
    e.preventDefault();
    setShowThanks(true);
  };

  return (
    <section
      id="call-to-action"
      aria-labelledby="cta-title"
      className="w-full bg-gradient-to-b from-white to-gray-50 py-16 px-4 sm:px-6 lg:px-12"
      role="region"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center lg:items-start gap-12">

        {/* Left: Texte + CTA */}
        <div className="flex-1 space-y-6 order-2 lg:order-1">
          <h2 id="cta-title" className="text-3xl sm:text-4xl font-extrabold text-gray-900">
            Agissez avec nous
          </h2>
          <p className="text-gray-700 text-base sm:text-lg leading-relaxed max-w-xl">
            Vous avez vu qui nous sommes et ce que nous faisons. Participez : un petit geste peut déclencher un grand changement.
          </p>

          {/* Cards pédagogiques */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
            <div className="flex flex-col items-center text-center bg-white p-4 rounded-xl shadow hover:shadow-lg transform hover:-translate-y-1 transition duration-300">
              <Heart className="w-8 h-8 text-[#7B2D2D] mb-2" />
              <h3 className="text-[#7B2D2D] font-semibold mb-1">Impact direct</h3>
              <p className="text-gray-700 text-sm">Chaque don soutient des projets concrets sur le terrain.</p>
            </div>
            <div className="flex flex-col items-center text-center bg-white p-4 rounded-xl shadow hover:shadow-lg transform hover:-translate-y-1 transition duration-300">
              <Users className="w-8 h-8 text-[#7B2D2D] mb-2" />
              <h3 className="text-[#7B2D2D] font-semibold mb-1">Bénévolat</h3>
              <p className="text-gray-700 text-sm">Rejoignez nos équipes pour aider directement les familles.</p>
            </div>
            <div className="flex flex-col items-center text-center bg-white p-4 rounded-xl shadow hover:shadow-lg transform hover:-translate-y-1 transition duration-300">
              <BookOpen className="w-8 h-8 text-[#7B2D2D] mb-2" />
              <h3 className="text-[#7B2D2D] font-semibold mb-1">Suivi transparent</h3>
              <p className="text-gray-700 text-sm">Consultez rapports et impact de vos contributions en toute clarté.</p>
            </div>
          </div>

          {/* CTA principaux */}
          <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <a
              href="/donate"
              onClick={handleDonateClick}
              className="inline-flex items-center gap-2 bg-[#7B2D2D] text-white font-semibold py-3 px-6 rounded-xl shadow hover:opacity-95 transition text-sm sm:text-base"
              aria-label="Faire un don — financer un projet identifié"
            >
              Faire un don
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/rejoindre"
              className="mt-3 sm:mt-0 inline-flex items-center gap-2 border border-gray-200 text-gray-800 font-medium py-3 px-6 rounded-xl hover:bg-gray-50 transition text-sm sm:text-base"
              aria-label="Devenir bénévole ou nous rejoindre"
            >
              Devenir bénévole / Nous rejoindre
            </a>
          </div>

          {/* Micro-confiance */}
          <p className="mt-4 text-xs text-gray-500">
            Transparence • Preuves terrain • Respect des bénéficiaires — contact RGPD :{" "}
            <a href="mailto:support@edisynchro.com" className="text-gray-600 hover:underline">
              support@edisynchro.com
            </a>
          </p>
        </div>

        {/* Right: Image */}
        <div className="flex-1 order-1 lg:order-2">
          <div className="w-full h-64 sm:h-80 lg:h-full bg-gray-200 rounded-2xl overflow-hidden shadow-md">
            <img
              src="/images/benevole-enfant.jpg"
              alt="Bénévole et enfant souriant en action"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Sticky donate button mobile */}
      <div className="sm:hidden">
        <a
          href="/donate"
          onClick={handleDonateClick}
          className="fixed left-4 right-4 bottom-4 z-50 inline-flex items-center justify-center gap-2 bg-[#7B2D2D] text-white font-semibold py-3 px-6 rounded-xl shadow-xl focus:outline-none focus:ring-2 focus:ring-[#7B2D2D]/50"
          aria-label="Faire un don — bouton rapide mobile"
        >
          Faire un don
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      {/* Modal remerciement */}
      {showThanks && (
        <div role="dialog" aria-modal="true" className="fixed inset-0 z-60 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowThanks(false)} />

          <div className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 z-10 animate-fade-in">
            <button
              onClick={() => setShowThanks(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
              aria-label="Fermer le remerciement"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold text-gray-900">Merci !</h3>
            <p className="mt-3 text-sm text-gray-700">
              Merci pour votre soutien — vous pouvez maintenant procéder au paiement sur la page dédiée.
              Après confirmation, vous recevrez un reçu et un suivi par email.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <a
                href="/donate"
                className="inline-flex items-center gap-2 bg-[#7B2D2D] text-white font-semibold py-2 px-4 rounded-md"
              >
                Aller au don
              </a>
              <button
                onClick={() => setShowThanks(false)}
                className="inline-flex items-center gap-2 border border-gray-200 py-2 px-4 rounded-md"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
