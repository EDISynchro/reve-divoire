import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const temoignages = [
  {
    id: 1,
    name: "Bénéficiaire Frip2Rêve",
    quote: "Grâce à la boutique, j’ai pu retrouver des vêtements pour mes enfants sans stress financier.",
    photo: "/images/temoignages/frip2reve_user1.jpg",
    source: "Natacha",
  },
  {
    id: 2,
    name: "Bénéficiaire Rêve d’Ivoire",
    quote: "Votre soutien a permis de financer des fournitures scolaires essentielles.",
    photo: "/images/temoignages/reveivoire_user1.jpg",
    source: "Natacha",
  },
  // Ajouter d'autres témoignages validés ici
];

export default function TemoignagesImpact() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? temoignages.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === temoignages.length - 1 ? 0 : i + 1));

  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* TITRE */}
        <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900">
          Ils racontent
        </h2>
        <p className="text-gray-700 max-w-2xl">
          Découvrez comment chaque geste fait une vraie différence pour ceux que Natacha et son équipe accompagnent.
        </p>

        {/* CARROUSEL */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {temoignages.map(
              (t, i) =>
                i === index && (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="bg-gray-50 rounded-lg p-6 flex flex-col items-center text-center space-y-4"
                  >
                    <img
                      src={t.photo}
                      alt={`Portrait de ${t.name}`}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                    <blockquote className="text-gray-800 italic text-lg">"{t.quote}"</blockquote>
                    <cite className="text-gray-500 font-medium">— {t.name}</cite>
                    <span className="text-xs text-gray-400">{t.source}</span>
                  </motion.div>
                )
            )}
          </AnimatePresence>

          {/* Navigation */}
          <button
            aria-label="Témoignage précédent"
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            aria-label="Témoignage suivant"
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
}
