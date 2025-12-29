import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail, Info } from "lucide-react";

/*
 SectionFAQ.js — full width, responsive & mobile-first
 Objectif : lisible en 1 pouce, fluide au scroll, rassurant sans surcharge.
*/

const FAQS = [
  {
    q: "Où va exactement l’argent des dons ?",
    a: "Les dons financent directement les projets de Rêve d’Ivoire : Frip2Rêve, actions de terrain, événements et campagnes locales. Chaque projet dispose de preuves (photos, vidéos, rapports) accessibles sur le site ou sur demande.",
    tip: "Les dons servent uniquement aux actions visibles.",
  },
  {
    q: "Comment puis-je vérifier que les actions sont réelles ?",
    a: "Chaque action est documentée avec des médias, des comptes rendus et des contacts identifiés. Les sections Actions et Impact & preuves montrent ce qui a été fait, sans promesses floues.",
    tip: "Preuves publiées ou indiquées comme en cours.",
  },
  {
    q: "Puis-je aider sans donner d’argent ?",
    a: "Oui. Tu peux devenir bénévole, donner des vêtements via Frip2Rêve, proposer un lieu, un service ou relayer nos actions. L’engagement n’est pas uniquement financier.",
    tip: "Le temps et l’énergie comptent aussi.",
  },
  {
    q: "À qui s’adressent vos actions ?",
    a: "Aux enfants, aux familles et aux écoles, principalement en Côte d’Ivoire, avec des actions de soutien et de mobilisation depuis la France.",
    tip: "Actions locales, besoins réels.",
  },
  {
    q: "Qui est derrière Rêve d’Ivoire ?",
    a: "L’association est portée par une équipe engagée, avec des partenaires identifiés comme l’ACJC. Les contacts officiels sont disponibles sur le site, et tu peux nous écrire directement.",
    tip: "Équipe identifiable et joignable.",
  },
  {
    q: "Comment vous contacter rapidement ?",
    a: "Par email à frip2reve@gmail.com, via le formulaire de contact ou lors des lives Zoom organisés chaque semaine.",
    tip: "Réponse humaine sous 72h.",
  },
];

export default function SectionFAQ({ contactEmail = "frip2reve@gmail.com" }) {
  const [openIndex, setOpenIndex] = useState(0);
  const [tooltip, setTooltip] = useState(null);

  return (
    <section className="bg-gray-50 py-14 sm:py-20 w-full" id="faq">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="text-center max-w-xl sm:max-w-2xl mx-auto mb-10 sm:mb-14"
        >
          <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900">
            Questions fréquentes
          </h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600">
            On répond simplement aux questions qu’on se pose avant de s’engager.
          </p>
        </motion.div>

        {/* Accordéon */}
        <div className="max-w-3xl sm:max-w-4xl mx-auto space-y-3 sm:space-y-4">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.04 }}
                className="bg-white rounded-xl shadow-sm"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-start sm:items-center justify-between gap-3 p-4 sm:p-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-sm sm:text-base text-gray-900">
                    {item.q}
                  </span>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Tooltip — désactivé hover sur mobile */}
                    <span
                      onMouseEnter={() => setTooltip(index)}
                      onMouseLeave={() => setTooltip(null)}
                      className="relative hidden sm:inline-block"
                    >
                      <Info size={16} className="text-gray-400" />
                      {tooltip === index && (
                        <div className="absolute right-0 top-6 z-10 w-52 p-2 text-xs bg-gray-900 text-white rounded-md">
                          {item.tip}
                        </div>
                      )}
                    </span>

                    <ChevronDown
                      size={18}
                      className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm text-gray-600">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Microcopy */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 sm:mt-14 text-center text-xs sm:text-sm text-gray-600"
        >
          <p className="font-medium">Transparence, preuves et dialogue</p>
          <p className="mt-1">
            Si une information n’est pas encore en ligne, elle est indiquée comme en cours de
            validation. Tu peux toujours demander.
          </p>
        </motion.div>

        {/* CTA final */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="mt-8 sm:mt-10 flex justify-center"
        >
          <a
            href={`mailto:${contactEmail}`}
            className="inline-flex items-center gap-2 px-6 sm:px-7 py-3 rounded-full bg-gray-900 text-white text-sm font-medium w-full sm:w-auto justify-center"
          >
            <Mail size={16} />
            Nous contacter
          </a>
        </motion.div>
      </div>
    </section>
  );
}
