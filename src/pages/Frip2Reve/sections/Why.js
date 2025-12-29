import React from "react";
import { motion } from "framer-motion";
import { HeartHandshake, ShieldCheck, Users, Package } from "lucide-react";

export default function WhyChooseFrip2Reve() {
  const points = [
    {
      title: "Solidarité directe",
      description: "Chaque vêtement ou accessoire vendu finance un projet éducatif ou social sur le terrain.",
      Icon: HeartHandshake,
    },
    {
      title: "Produits sélectionnés avec soin",
      description: "Qualité, style et propreté : chaque article est vérifié avant d’être proposé à la vente.",
      Icon: ShieldCheck,
    },
    {
      title: "Impact durable",
      description: "Les fonds collectés servent à des actions concrètes : kits scolaires, friperie solidaire, ateliers éducatifs.",
      Icon: Users,
    },
    {
      title: "Transparence et confiance",
      description: "Suivez facilement où va votre contribution et découvrez les projets que vous soutenez.",
      Icon: Package,
    },
  ];

  return (
    <section className="w-full bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        {/* TITRE */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-10"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Votre achat a du sens
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Chaque article acheté contribue à créer un impact réel pour les enfants et les familles soutenues par Rêve d’Ivoire.
          </p>
        </motion.div>

        {/* POINTS CLÉS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-gray-50 rounded-xl shadow-sm p-6 flex flex-col items-center text-center space-y-4 hover:shadow-md transition-shadow duration-300"
            >
              <div className="p-4 rounded-full bg-green-100 text-green-600">
                <point.Icon size={28} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{point.title}</h3>
              <p className="text-gray-600 text-sm">{point.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/frip2reve"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-gray-800"
          >
            Acheter maintenant
          </a>
          <a
            href="/actions"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50"
          >
            Découvrir nos projets
          </a>
        </div>
      </div>
    </section>
  );
}
