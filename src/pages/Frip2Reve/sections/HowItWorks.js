import React from "react";
import { motion } from "framer-motion";
import { Package, Repeat, Users } from "lucide-react";

export default function HowItWorksFrip2Reve() {
  const steps = [
    {
      title: "Donner ou apporter des vêtements",
      description:
        "Déposez vos vêtements propres et en bon état à notre friperie ou envoyez-les via nos points de collecte partenaires.",
      Icon: Package,
    },
    {
      title: "Trier et valoriser",
      description:
        "Nos bénévoles trient, réparent si nécessaire et préparent chaque vêtement pour la vente solidaire.",
      Icon: Repeat,
    },
    {
      title: "Acheter ou soutenir un projet",
      description:
        "Chaque achat ou don permet de financer directement des projets éducatifs, des kits scolaires et des actions pour les enfants.",
      Icon: Users,
    },
  ];

  return (
    <section className="w-full bg-gray-50 py-20 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Transformez des vêtements en actions concrètes
          </h2>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Participer à Frip2Rêve, c’est facile et chaque geste compte pour les enfants de Rêve d’Ivoire.
          </p>
        </motion.div>

        {/* ETAPES */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center space-y-4"
            >
              <div className="p-4 rounded-full bg-green-100 text-green-600">
                <step.Icon size={28} />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{step.title}</h3>
              <p className="text-gray-600 text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/don"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-gray-800"
          >
            Apporter des vêtements
          </a>
          <a
            href="/actions"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-gray-300 text-sm font-medium text-gray-900 hover:bg-gray-50"
          >
            Découvrir nos projets financés
          </a>
        </div>

        {/* Optionnel : mini flèche / flux */}
        <div className="mt-12 text-gray-400 text-sm">
          Don &rarr; Tri &rarr; Impact
        </div>
      </div>
    </section>
  );
}
