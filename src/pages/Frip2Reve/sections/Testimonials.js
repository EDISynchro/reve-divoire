import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Exemple de données
const testimonialsData = [
  {
    name: "Élève bénéficiaire",
    quote: "Grâce aux kits scolaires, j’ai pu continuer mes cours et mieux apprendre chaque jour.",
    photo: "/media/testimonial-eleve.jpg",
  },
  {
    name: "Parent bénéficiaire",
    quote: "La friperie solidaire a permis à ma famille de se vêtir convenablement et soutenir mes études.",
    photo: "/media/testimonial-parent.jpg",
  },
  {
    name: "Enfant participant",
    quote: "Les ateliers éducatifs sont passionnants et m’aident à découvrir de nouvelles compétences.",
    photo: "/media/testimonial-enfant.jpg",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const total = testimonialsData.length;

  const prevSlide = () => setCurrent((prev) => (prev - 1 + total) % total);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % total);

  return (
    <section className="w-full bg-gray-50 py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        {/* TITRE */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Ils nous racontent leur expérience
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Découvrez les histoires vraies d’enfants, de familles et de partenaires qui bénéficient directement des actions de Rêve d’Ivoire et de Frip2Rêve.
          </p>
        </motion.div>

        {/* SLIDER */}
        <div className="relative w-full max-w-3xl mx-auto">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-xl shadow-md p-8 flex flex-col items-center text-center space-y-4"
          >
            <img
              src={testimonialsData[current].photo}
              alt={`Photo de ${testimonialsData[current].name}`}
              className="w-24 h-24 rounded-full object-cover"
            />
            <p className="text-gray-700 italic">“{testimonialsData[current].quote}”</p>
            <span className="text-gray-900 font-semibold">{testimonialsData[current].name}</span>
          </motion.div>

          {/* NAVIGATION */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4">
            <button
              onClick={prevSlide}
              aria-label="Slide précédent"
              className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
            >
              <ArrowLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Slide suivant"
              className="p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>

        {/* MINI CHIFFRES IMPACTANTS */}
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-gray-700 text-sm">
          <span>+100 enfants équipés en kits scolaires</span>
          <span>+50 familles accompagnées</span>
          <span>+30 ateliers organisés</span>
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/actions"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-gray-800"
          >
            Voir toutes nos actions
          </a>
          <a
            href="/don"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50"
          >
            Faire un don
          </a>
        </div>
      </div>
    </section>
  );
}
