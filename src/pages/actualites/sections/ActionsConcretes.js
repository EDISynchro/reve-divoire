import React from "react";
import { ShoppingCart, Heart, Share2 } from "lucide-react";
import { motion } from "framer-motion";

const actionsData = [
  {
    id: 1,
    title: "Soutenir Frip2Rêve",
    description: "Achetez dans la boutique solidaire et contribuez aux projets",
    link: "/frip2reve",
    media: "/images/actions/frip2reve.jpg",
    icon: <ShoppingCart size={24} />,
    source: "Confirmé par Natacha",
  },
  {
    id: 2,
    title: "Faire un don",
    description: "Un petit geste financier permet de grandes avancées",
    link: "/don",
    media: "/images/actions/don.jpg",
    icon: <Heart size={24} />,
    source: "Confirmé par Natacha",
  },
  {
    id: 3,
    title: "Partager & inviter",
    description: "Parlez-en autour de vous, chaque visibilité compte",
    link: "#share",
    media: "/images/actions/share.jpg",
    icon: <Share2 size={24} />,
    source: "Confirmé par Natacha",
  },
];

export default function ActionsConcretes() {
  return (
    <section className="w-full bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* TITRE */}
        <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900">
          Comment participer
        </h2>
        <p className="text-gray-700 max-w-xl">
          Chaque geste compte : petits dons, achats solidaires ou partages permettent à Natacha et l’équipe de continuer leurs actions.
        </p>

        {/* GRILLE ACTIONS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {actionsData.map((action) => (
            <motion.div
              key={action.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              {/* Media */}
              <img
                src={action.media}
                alt={action.title}
                className="w-full h-48 object-cover"
              />

              {/* Contenu */}
              <div className="p-4 flex flex-col flex-grow">
                <div className="flex items-center gap-2 mb-2 text-gray-800 font-semibold">
                  {action.icon}
                  <h3 className="text-lg">{action.title}</h3>
                </div>
                <p className="text-gray-600 flex-grow">{action.description}</p>

                {/* Source / badge */}
                <span className="mt-2 text-xs text-gray-500">{action.source}</span>

                {/* CTA */}
                <a
                  href={action.link}
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md text-sm text-center hover:bg-green-700 active:bg-green-800"
                >
                  {action.title.includes("Partager") ? "Partager" : "Découvrir"}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
