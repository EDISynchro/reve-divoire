import React from "react";
import { Heart, Users, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const actions = [
  {
    id: 1,
    title: "Faire un don",
    link: "/donate",
    icon: Heart,
    microcopy: "Chaque contribution finance un projet concret sur le terrain.",
    color: "bg-red-100 text-red-600",
  },
  {
    id: 2,
    title: "Devenir bénévole",
    link: "/rejoindre",
    icon: Users,
    microcopy: "Rejoignez nos équipes et accompagnez les familles directement.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 3,
    title: "Suivi transparent",
    link: "/impact",
    icon: BookOpen,
    microcopy: "Consultez rapports et impact de vos contributions en toute clarté.",
    color: "bg-green-100 text-green-600",
  },
];

export default function SupportEngagement() {
  return (
    <section className="w-full bg-white py-16 px-4">
      <div className="max-w-5xl mx-auto space-y-6 text-center">
        <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900">
          Participez au changement
        </h2>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Chaque geste compte. Que ce soit un don, du bénévolat ou un partage,
          votre action transforme la vie des enfants et familles soutenus.
        </p>

        {/* GRID CTA */}
        <div className="grid gap-6 md:grid-cols-3 mt-8">
         {actions.map((a) => {
  const IconComponent = a.icon; // <- créer une variable avec la majuscule
  return (
    <motion.a
      key={a.id}
      href={a.link}
      className={`flex flex-col items-center p-6 rounded-xl shadow hover:shadow-lg transform hover:-translate-y-1 transition duration-300 ${a.color}`}
      whileHover={{ scale: 1.03 }}
      whileFocus={{ scale: 1.03 }}
    >
      <IconComponent size={40} className="mb-4" aria-hidden="true" /> {/* <- utiliser la variable */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{a.title}</h3>
      <p className="text-gray-700 text-center text-sm">{a.microcopy}</p>
    </motion.a>
  );
})}

        </div>
      </div>
    </section>
  );
}
