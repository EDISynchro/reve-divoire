import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail, Info } from "lucide-react";

/*
 SectionFAQContact.js — full width, responsive & mobile-first
 Objectif : anticiper les questions avant l’envoi du formulaire.
*/

const FAQS = [
  {
    q: "Quels documents dois-je fournir pour un projet ?",
    a: "Aucun document n’est obligatoire pour un premier contact. Une description claire de votre besoin suffit. Nous vous demanderons ensuite les éléments nécessaires, si besoin.",
    tip: "Un simple message suffit pour démarrer.",
  },
  {
    q: "Quels sont vos délais de réponse aux messages ?",
    a: "Nous répondons généralement sous 48 heures ouvrées. Les demandes urgentes sont traitées en priorité lorsqu’elles sont clairement indiquées.",
    tip: "Réponse humaine, pas automatique.",
  },
  {
    q: "Puis-je vous contacter même si mon projet n’est pas défini ?",
    a: "Oui. Vous pouvez simplement expliquer votre situation ou votre idée. Nous vous aidons à clarifier votre besoin étape par étape.",
    tip: "Pas besoin d’un brief parfait.",
  },
  {
    q: "Puis-je visiter vos locaux ?",
    a: "Oui, sur rendez-vous uniquement. Il suffit de nous contacter pour convenir d’un créneau adapté.",
    tip: "Visite possible sur demande.",
  },
  {
    q: "Mes informations sont-elles confidentielles ?",
    a: "Oui. Les informations transmises via le formulaire ou par email sont utilisées uniquement pour répondre à votre demande et ne sont jamais partagées.",
    tip: "Respect total de la confidentialité.",
  },
  {
    q: "Je n’ai pas trouvé ma réponse ici, que faire ?",
    a: "Dans ce cas, contactez-nous directement. Nous préférons répondre clairement plutôt que laisser un doute.",
    tip: "Toujours joignables.",
  },
];

export default function SectionFAQContact({ contactEmail = "contact@revedivoire.org" }) {
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
          <h2
            id="faq-title"
            className="text-2xl sm:text-4xl font-extrabold text-gray-900"
          >
            Vous avez des questions ?
          </h2>
          <p className="mt-2 sm:mt-3 text-sm sm:text-base text-gray-600">
            Avant de nous contacter, voici quelques réponses rapides aux questions les plus courantes.
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
                  <h3 className="font-medium text-sm sm:text-base text-gray-900">
                    {item.q}
                  </h3>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Tooltip desktop */}
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
                      role="region"
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

        {/* Micro-rassurance */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-10 sm:mt-14 text-center text-xs sm:text-sm text-gray-600"
        >
          <p className="font-medium">Disponibilité, clarté et réactivité</p>
          <p className="mt-1">
            Si une information n’est pas encore précisée, nous vous l’indiquons clairement.
          </p>
        </motion.div>

        {/* CTA */}
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
