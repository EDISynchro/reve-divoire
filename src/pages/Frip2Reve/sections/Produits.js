import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function ProductsFrip2Reve({ products = [] }) {
  // Exemple par défaut si pas de props
  const defaultProducts = [
    {
      title: "Vêtements enfants et adultes",
      description: "Des habits soigneusement sélectionnés, propres et prêts à être portés.",
      image: "/media/produits-vetements.jpg",
    },
    {
      title: "Accessoires",
      description: "Sacs, chaussures, bijoux… chaque pièce a été triée et préparée pour vous.",
      image: "/media/produits-accessoires.jpg",
    },
    {
      title: "Objets utiles et déco",
      description: "Articles pratiques et originaux pour la maison ou le quotidien.",
      image: "/media/produits-deco.jpg",
    },
  ];

  const items = products.length > 0 ? products : defaultProducts;

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
            Découvrez la friperie solidaire Frip2Rêve
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Chaque vêtement a une histoire et contribue à un projet pour les enfants de Rêve d’Ivoire. Mode, style et solidarité se rencontrent ici !
          </p>
        </motion.div>

        {/* GRILLE DE PRODUITS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-64 object-cover"
                />
                <span className="absolute top-2 left-2 bg-green-600 text-white text-xs font-semibold px-2 py-1 rounded">
                  Action solidaire
                </span>
              </div>
              <div className="p-6 text-left">
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 mt-2">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/frip2reve"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-gray-800"
          >
            Voir nos produits
          </a>
          <a
            href="/actions"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50"
          >
            Soutenir un projet
          </a>
        </div>

        {/* Mini rappel flux */}
        <div className="mt-6 text-gray-500 text-sm">
          Chaque achat finance directement un projet éducatif ou social et contribue à un impact durable.
        </div>
      </div>
    </section>
  );
}
