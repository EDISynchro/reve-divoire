import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Package } from "lucide-react";

export default function HeroFrip2Reve({
  imageSrc = "/media/frip2reve-boutique.jpg",
  videoSrc = null,
  donateHref = "/don",
  discoverHref = "/frip2reve",
  stats = [
    { label: "vêtements revalorisés", value: "500+", Icon: Package },
    { label: "projets financés", value: "10+", Icon: Package },
    { label: "action locale & transparente", value: "Oui", Icon: Package },
  ],
}) {
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="bg-white">
      <div className="max-w-7xl mt-8 mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-16 lg:py-24">

          {/* TEXTE HERO */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 text-center lg:text-left"
          >
            <p className="text-sm font-semibold text-green-600">
              Frip2Rêve — projet solidaire
            </p>

            <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
              Frip2Rêve — La friperie solidaire qui finance des actions pour les enfants
            </h1>

            <p className="text-lg text-gray-600 max-w-xl">
              Chaque vêtement collecté, trié et vendu permet de soutenir concrètement les projets de Rêve d’Ivoire.
            </p>

            <p className="text-gray-700 max-w-xl">
              Frip2Rêve transforme des vêtements de seconde main en ressources utiles.
              En achetant ou en donnant, tu participes directement au financement d’actions éducatives et solidaires.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <a
                href={discoverHref}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-gray-800"
              >
                Découvrir la friperie
                <ArrowRight size={16} />
              </a>
              <a
                href={donateHref}
                className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50"
              >
                Donner des vêtements
              </a>
            </div>
     
          </motion.div>

          {/* VISUEL HERO */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative rounded-xl overflow-hidden shadow-lg"
          >
            {videoSrc ? (
              <video
                src={videoSrc}
                controls
                muted
                playsInline
                className="w-full h-72 lg:h-full object-cover"
              />
            ) : (
              <img
                src={imageSrc}
                alt="Frip2Rêve — bénévoles triant des vêtements solidaires"
                className="w-full h-72 lg:h-full object-cover"
              />
            )}
          </motion.div>

        </div>
      </div>
    </header>
  );
}
