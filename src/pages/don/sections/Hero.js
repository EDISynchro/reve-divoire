import React from "react";
import { HeartHandshake, ShieldCheck, Camera } from "lucide-react";
import { motion } from "framer-motion";

export default function DonateHero() {
  return (
    <section
      aria-labelledby="don-hero-title"
      className="w-full bg-gray-50 px-4 md:px-12 mt-20 py-20 md:py-20"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">

        {/* Texte */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-4"
        >
          <h1
            id="don-hero-title"
            className="text-2xl md:text-3xl font-bold text-gray-900"
          >
            Faire un don, c’est agir maintenant
          </h1>

          <p className="text-sm md:text-base text-gray-700 max-w-md">
            Votre don soutient directement les actions de Rêve d’Ivoire et la
            friperie solidaire Frip2Rêve.
          </p>

          <p className="text-sm text-gray-600 max-w-md">
            Actions suivies par l’équipe et documentées.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <a
              href="#don"
              className="inline-flex justify-center items-center px-6 py-3 rounded-md bg-[#7B2D2D] text-white text-sm font-semibold"
            >
              Faire un don
            </a>
            <a
              href="/actions"
              className="inline-flex justify-center items-center px-6 py-3 rounded-md border border-gray-300 text-gray-800 text-sm font-medium"
            >
              Voir nos actions
            </a>
          </div>
        </motion.div>

        {/* Visuel */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full h-48 md:h-56 rounded-lg overflow-hidden bg-gray-200"
        >
          <img
            src="/images/action-frip2reve.jpg"
            alt="Action solidaire soutenue par les dons — Rêve d’Ivoire"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      {/* Rassurance compacte */}
      <div className="max-w-5xl mx-auto mt-8 grid grid-cols-3 gap-4 text-center">
        <div className="flex flex-col items-center gap-1">
          <HeartHandshake size={22} className="text-[#7B2D2D]" />
          <p className="text-xs font-medium">Actions réelles</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <Camera size={22} className="text-[#7B2D2D]" />
          <p className="text-xs font-medium">Transparence</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <ShieldCheck size={22} className="text-[#7B2D2D]" />
          <p className="text-xs font-medium">Impact direct</p>
        </div>
      </div>
    </section>
  );
}
