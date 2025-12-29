// src/pages/About/sections/ValuesSectionPro.jsx
import React, { useState } from "react";
import { Eye, MapPin, Users, Leaf, Info, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

/* -------------------------
   Tooltip (inline)
-------------------------- */
function Tooltip({ content, children }) {
  const [open, setOpen] = useState(false);

  return (
    <span
      className="relative inline-flex items-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}

      <AnimatePresence>
        {open && (
          <motion.span
            className="absolute z-50 bottom-full mb-2 px-3 py-1.5 text-xs text-white bg-gray-900 rounded-md whitespace-nowrap shadow-lg"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.2 }}
          >
            {content}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

/* -------------------------
   Modal (inline)
-------------------------- */
function Modal({ children, onClose }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal box */}
      <motion.div
        className="relative bg-white rounded-2xl shadow-xl max-w-md w-full p-6 z-10"
        initial={{ scale: 0.92, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.92, y: 20, opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
          aria-label="Fermer"
        >
          <X className="h-5 w-5" />
        </button>

        {children}
      </motion.div>
    </motion.div>
  );
}

/* -------------------------
   Data
-------------------------- */
const valuesData = [
  {
    icon: Eye,
    title: "Transparence",
    description:
      "Tous nos comptes, rapports et actions sont accessibles, avec preuves terrain.",
    details:
      "Rapports financiers, photos terrain, bilans d’actions et documents téléchargeables publiquement."
  },
  {
    icon: MapPin,
    title: "Impact local",
    description:
      "Nos projets sont construits avec les communautés locales.",
    details:
      "Chaque action est pensée sur place avec les familles, écoles et partenaires ivoiriens."
  },
  {
    icon: Users,
    title: "Respect & dignité",
    description:
      "Chaque bénéficiaire est accompagné sans stigmatisation.",
    details:
      "Procédures internes, respect culturel, écoute active et retours anonymisés."
  },
  {
    icon: Leaf,
    title: "Durabilité",
    description:
      "Nous privilégions le réemploi et l’autonomie sur le long terme.",
    details:
      "Réemploi des dons, suivi éducatif sur plusieurs années et projets autonomes."
  }
];

/* -------------------------
   Section
-------------------------- */
export default function ValuesSectionPro() {
  const [activeValue, setActiveValue] = useState(null);

  return (
    <section
      id="valeurs"
      className="relative bg-gradient-to-b from-white to-gray-50 py-20 px-6 lg:px-12 overflow-hidden"
    >
      {/* Background shape */}
      <motion.div
        className="absolute top-0 left-1/2 w-[900px] h-[450px] bg-[#7B2D2D] rounded-full opacity-10 -translate-x-1/2 pointer-events-none"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Title */}
        <header className="text-center max-w-3xl mx-auto mb-14">
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Nos valeurs et engagements
          </motion.h2>
          <motion.p
            className="mt-4 text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            Des principes clairs pour un impact réel, mesurable et durable.
          </motion.p>
        </header>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {valuesData.map((item, idx) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl cursor-pointer"
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                onClick={() => setActiveValue(item)}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-full bg-gray-50">
                    <Icon className="h-6 w-6 text-[#7B2D2D]" />
                  </div>

                  <h3 className="font-semibold text-[#7B2D2D]">
                    {item.title}
                  </h3>

                  <Tooltip content="Cliquer pour en savoir plus">
                    <Info className="h-4 w-4 text-gray-400" />
                  </Tooltip>
                </div>

                <p className="text-sm text-gray-600">{item.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeValue && (
          <Modal onClose={() => setActiveValue(null)}>
            <h3 className="text-xl font-bold text-[#7B2D2D]">
              {activeValue.title}
            </h3>
            <p className="mt-4 text-gray-600 leading-relaxed">
              {activeValue.details}
            </p>
          </Modal>
        )}
      </AnimatePresence>
    </section>
  );
}
