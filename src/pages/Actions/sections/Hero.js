import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Users, Package, Repeat } from "lucide-react";

import heroImg from '../../../assets/revedivoire/image4.png';
/*
 HeroActions.js
 Composant Hero pour la page "Actions"

 Explication simple :
 C'est le bloc en haut de la page.
 En quelques secondes, on comprend ce qu'on fait,
 on voit une vraie image/vidéo,
 et on a deux boutons clairs pour agir.
*/

export default function HeroActions({
  imageSrc = heroImg,
  videoSrc = null,
  stats = [
    { label: "enfants accompagnés", value: "520+", Icon: Users },
    { label: "kg de vêtements revalorisés", value: "4 200 kg", Icon: Package },
    { label: "actions locales durables", value: "Impact réel", Icon: Repeat },
  ],
  donateHref = "/don",
}) {
  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="bg-white">
      <div className="max-w-7xl mt-20 mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center py-14 lg:py-20">

          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <p className="text-sm font-semibold text-green-600">
              Actions — Rêve d'Ivoire
            </p>
<h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
  Agir, concrètement, pour les enfants
</h1>

<p className="text-lg text-gray-600 max-w-xl">
  Derrière chaque action de Rêve d'Ivoire, il y a des enfants, des familles et des écoles accompagnés sur le terrain, avec des résultats visibles et durables.
</p>

<p className="text-base text-gray-600 max-w-xl">
  Kits scolaires, friperie solidaire, bibliothèques, ateliers éducatifs…
  Chaque projet est pensé pour répondre à un besoin réel et créer un impact qui dure.
</p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToId("projects")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-gray-800"
              >
                Voir nos actions
                <ArrowRight size={16} />
              </button>

              <a
                href={donateHref}
                className="inline-flex items-center justify-center px-6 py-3 rounded-md border border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50"
              >
                Soutenir un projet
              </a>
            </div>

            {/* Chiffres clés */}
          
          </motion.div>

          {/* Visuel */}
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
                className="w-full h-64 lg:h-80 object-cover"
              />
            ) : (
              <img
                src={imageSrc}
                alt="Actions sur le terrain — Rêve d'Ivoire"
                className="w-full h-64 lg:h-80 "
              />
            )}
          </motion.div>

        </div>
      </div>
    </header>
  );
}
